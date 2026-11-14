import { getPool } from "./db";
import { audit } from "./session";

export class HomologationError extends Error {
  status: number;
  code: string;
  constructor(code: string, message: string, status = 400) {
    super(message);
    this.name = "HomologationError";
    this.code = code;
    this.status = status;
  }
}

/** Frank board: functional / demo / needs homologation — never invent approvals. */
export async function buildReadinessBoard() {
  const pool = getPool();

  const [domains, checklist, envs, plans, erp, rules, pendencies] = await Promise.all([
    pool.query(`SELECT code, title, status, evidence_notes, approved_by, approved_at
                FROM homologation_domains ORDER BY title`),
    pool.query(`SELECT code, section, title, status, evidence, updated_at
                FROM launch_checklist_items ORDER BY code`),
    pool.query(`SELECT code, label, is_live_billing, allows_homologated_fiscal, notes
                FROM environment_profiles ORDER BY code`),
    pool.query(
      `SELECT p.code, p.publishable, v.is_price_placeholder, v.status AS version_status
       FROM plans p JOIN plan_versions v ON v.plan_id = p.id
       WHERE p.kind = 'paid'`,
    ),
    pool.query(`SELECT code, title, homologated, notes FROM erp_adapters ORDER BY code`),
    pool.query(
      `SELECT r.code AS rule_code, v.version_label, v.status
       FROM tax_rule_versions v
       JOIN tax_rules r ON r.id = v.tax_rule_id
       ORDER BY v.created_at DESC LIMIT 20`,
    ),
    pool.query(
      `SELECT code, title, category, blocks, status, owner_role, source_ref, notes
       FROM activation_pendencies ORDER BY code`,
    ),
  ]);

  const checklistDone = checklist.rows.filter((r) => r.status === "done").length;
  const checklistTotal = checklist.rows.length;
  const domainsApproved = domains.rows.filter((r) => r.status === "approved").length;
  const openPendencies = pendencies.rows.filter((p) => p.status === "open" || p.status === "in_progress");
  const paidPublishable = plans.rows.some((p) => p.publishable && !p.is_price_placeholder);
  const erpHomologated = erp.rows.some((e) => e.homologated);
  const hasHomologatedRule = rules.rows.some((r) => r.status === "homologated");
  const liveBillingEnabled = envs.rows.some((e) => e.is_live_billing);

  // Never auto-approve launch from scaffolding — human evidence required.
  const launchApproved = false;

  const frank = {
    functional: [
      "E0–E1: cadastro, login, orgs, empresas, cotas trial (3 CNPJ / 5 NF-e)",
      "E2: importação XML/ZIP com storage imutável e SHA-256",
      "E3: classificação/revisão com auditoria",
      "E4: motor com caminho pending + demo aritmética explícita",
      "E5: export ZIP com originais intactos (ERP não certificado)",
      "E6: planos/contratos scaffold + mock_sandbox idempotente",
    ],
    demonstration_only: [
      "Casos aritméticos DIFAL (CASOS_ARITMETICOS) — not_homologated",
      "Amostra Convênio 52/91 desativada para auto-aplicação",
      "Preços placeholder de planos pagos (não oficiais)",
      "Webhook/checkout mock_sandbox (sem provedor real)",
    ],
    needs_homologation_for_production: [
      "Regras fiscais RJ com status=homologated + fonte/competência (P01–P05, P14)",
      "Biblioteca de benefícios completa e vigente (P04)",
      "Adaptador ERP após importação real documentada (P06)",
      "Ofertas comerciais, contratos e política de multa (P07–P09, P12)",
      "Provedor de pagamento real + conciliação (P11)",
      "Privacidade/LGPD operacional (P10)",
      "Backup/restore drill, domínio, suporte e go-live (P13, L13–L14)",
    ],
    flags: {
      paidPublishable,
      erpHomologated,
      hasHomologatedRule,
      liveBillingEnabled,
      checklistProgress: { done: checklistDone, total: checklistTotal },
      domainsApproved,
      domainsTotal: domains.rows.length,
      openPendencies: openPendencies.length,
      pendenciesTotal: pendencies.rows.length,
      launchApproved,
    },
  };

  return {
    frank,
    domains: domains.rows,
    checklist: checklist.rows,
    environments: envs.rows,
    erpAdapters: erp.rows,
    recentRuleVersions: rules.rows,
    activationPendencies: pendencies.rows,
    disclaimer:
      "Homologação fiscal, jurídica e de integração são independentes (docs/03). UI/math OK ≠ lançamento aprovado.",
  };
}

export async function persistReadinessSnapshot(actorUserId: string, tenantId: string | null) {
  const board = await buildReadinessBoard();
  const pool = getPool();
  const { rows } = await pool.query(
    `INSERT INTO readiness_snapshots (payload, launch_approved)
     VALUES ($1::jsonb, $2)
     RETURNING id, generated_at, launch_approved`,
    [JSON.stringify(board), false],
  );
  await audit(pool, {
    tenantId,
    actorUserId,
    action: "homologation.readiness_snapshot",
    entityType: "readiness_snapshot",
    entityId: rows[0].id,
    detail: { launchApproved: false },
  });
  return { snapshot: rows[0], board };
}

export async function updateChecklistItem(args: {
  code: string;
  status: "pending" | "done" | "blocked" | "waived";
  evidence: string;
  actorUserId: string;
  tenantId: string;
  role: string;
}) {
  if (!["owner", "admin"].includes(args.role)) {
    throw new HomologationError("FORBIDDEN", "Apenas owner/admin atualizam o checklist.", 403);
  }
  if ((args.status === "done" || args.status === "waived") && !args.evidence.trim()) {
    throw new HomologationError(
      "EVIDENCE_REQUIRED",
      "Informe evidência (link/commit/ata) ao marcar done/waived.",
    );
  }

  const pool = getPool();
  const { rows } = await pool.query(
    `UPDATE launch_checklist_items
     SET status = $2, evidence = $3, updated_at = NOW()
     WHERE code = $1
     RETURNING code, section, title, status, evidence, updated_at`,
    [args.code, args.status, args.evidence.trim()],
  );
  if (!rows[0]) {
    throw new HomologationError("NOT_FOUND", "Item de checklist não encontrado.", 404);
  }

  await audit(pool, {
    tenantId: args.tenantId,
    actorUserId: args.actorUserId,
    action: "homologation.checklist_updated",
    entityType: "launch_checklist_item",
    entityId: args.code,
    detail: { status: args.status },
  });

  return rows[0];
}

export async function updatePendency(args: {
  code: string;
  status: "open" | "in_progress" | "resolved" | "accepted_risk";
  notes: string;
  actorUserId: string;
  tenantId: string;
  role: string;
}) {
  if (!["owner", "admin"].includes(args.role)) {
    throw new HomologationError("FORBIDDEN", "Apenas owner/admin atualizam pendências.", 403);
  }
  if (
    (args.status === "resolved" || args.status === "accepted_risk") &&
    !args.notes.trim()
  ) {
    throw new HomologationError(
      "EVIDENCE_REQUIRED",
      "Resolver/aceitar risco exige notas de evidência — não inventar homologação.",
    );
  }

  const pool = getPool();
  const { rows } = await pool.query(
    `UPDATE activation_pendencies
     SET status = $2, notes = $3, updated_at = NOW()
     WHERE code = $1
     RETURNING code, title, category, blocks, status, owner_role, notes, updated_at`,
    [args.code, args.status, args.notes.trim()],
  );
  if (!rows[0]) {
    throw new HomologationError("NOT_FOUND", "Pendência não encontrada.", 404);
  }

  await audit(pool, {
    tenantId: args.tenantId,
    actorUserId: args.actorUserId,
    action: "homologation.pendency_updated",
    entityType: "activation_pendency",
    entityId: args.code,
    detail: { status: args.status },
  });

  return rows[0];
}

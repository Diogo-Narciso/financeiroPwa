import {
  assessRetention,
  suggestPurpose,
  type Purpose,
} from "@portal-difal/classifier";
import { getPool } from "./db";
import { audit } from "./session";

export class AnalysisError extends Error {
  status: number;
  code: string;
  constructor(code: string, message: string, status = 400) {
    super(message);
    this.name = "AnalysisError";
    this.code = code;
    this.status = status;
  }
}

export async function analyzeCompanyItems(args: {
  tenantId: string;
  companyId: string;
  actorUserId: string;
}): Promise<{ analyzed: number }> {
  const pool = getPool();
  const owned = await pool.query(
    `SELECT id FROM companies WHERE id = $1 AND tenant_id = $2`,
    [args.companyId, args.tenantId],
  );
  if ((owned.rowCount ?? 0) === 0) {
    throw new AnalysisError("COMPANY_NOT_FOUND", "Empresa não encontrada.", 404);
  }

  const activity = await pool.query<{
    sectors: string[];
    answers: Record<string, string>;
  }>(
    `SELECT sectors, answers FROM company_activity_profiles
     WHERE company_id = $1 AND tenant_id = $2
       AND (effective_to IS NULL OR effective_to >= CURRENT_DATE)
     ORDER BY effective_from DESC, created_at DESC LIMIT 1`,
    [args.companyId, args.tenantId],
  );
  const sectors = activity.rows[0]?.sectors ?? [];
  const answers = activity.rows[0]?.answers ?? {};

  const { rows: items } = await pool.query<{
    id: string;
    description: string | null;
    ncm: string | null;
    cest: string | null;
    cfop_issuer: string | null;
    raw_fields: Record<string, unknown>;
  }>(
    `SELECT i.id, i.description, i.ncm, i.cest, i.cfop_issuer, i.raw_fields
     FROM invoice_items i
     WHERE i.tenant_id = $1 AND i.company_id = $2`,
    [args.tenantId, args.companyId],
  );

  let analyzed = 0;
  for (const item of items) {
    const suggestion = suggestPurpose({
      description: item.description,
      ncm: item.ncm,
      cfopIssuer: item.cfop_issuer,
      companySectors: sectors,
      companyAnswers: answers,
    });
    const retention = assessRetention({
      rawFields: item.raw_fields,
      description: item.description,
      cest: item.cest,
      stHints: {
        hasIcmsSt: Boolean(item.raw_fields?.hasIcmsSt),
        hasStRet: Boolean(item.raw_fields?.hasStRet),
        hasCest: Boolean(item.cest),
      },
    });

    await pool.query(
      `INSERT INTO item_classification_suggestions
         (tenant_id, company_id, invoice_item_id, purpose, confidence, reasons, engine_version)
       VALUES ($1,$2,$3,$4,$5,$6::jsonb,$7)
       ON CONFLICT (invoice_item_id) DO UPDATE SET
         purpose = EXCLUDED.purpose,
         confidence = EXCLUDED.confidence,
         reasons = EXCLUDED.reasons,
         engine_version = EXCLUDED.engine_version,
         created_at = NOW()`,
      [
        args.tenantId,
        args.companyId,
        item.id,
        suggestion.purpose,
        suggestion.confidence,
        JSON.stringify(suggestion.reasons),
        suggestion.engineVersion,
      ],
    );

    await pool.query(
      `INSERT INTO item_retention_assessments
         (tenant_id, company_id, invoice_item_id, status, flags, warning_text, engine_version)
       VALUES ($1,$2,$3,$4,$5::jsonb,$6,$7)
       ON CONFLICT (invoice_item_id) DO UPDATE SET
         status = EXCLUDED.status,
         flags = EXCLUDED.flags,
         warning_text = EXCLUDED.warning_text,
         engine_version = EXCLUDED.engine_version,
         created_at = NOW()`,
      [
        args.tenantId,
        args.companyId,
        item.id,
        retention.status,
        JSON.stringify(retention.flags),
        retention.warningText,
        retention.engineVersion,
      ],
    );
    analyzed += 1;
  }

  await audit(pool, {
    tenantId: args.tenantId,
    actorUserId: args.actorUserId,
    action: "analysis.reprocessed",
    entityType: "company",
    entityId: args.companyId,
    detail: { analyzed },
  });

  return { analyzed };
}

export async function decideClassification(args: {
  tenantId: string;
  actorUserId: string;
  itemId: string;
  purpose: Purpose;
  acceptSuggestion: boolean;
  reason?: string;
}) {
  const pool = getPool();
  const item = await pool.query<{
    id: string;
    company_id: string;
  }>(
    `SELECT id, company_id FROM invoice_items WHERE id = $1 AND tenant_id = $2`,
    [args.itemId, args.tenantId],
  );
  if (!item.rows[0]) {
    throw new AnalysisError("ITEM_NOT_FOUND", "Item não encontrado.", 404);
  }

  const suggestion = await pool.query<{ id: string; purpose: string }>(
    `SELECT id, purpose FROM item_classification_suggestions WHERE invoice_item_id = $1`,
    [args.itemId],
  );

  if (!args.acceptSuggestion && !args.reason?.trim()) {
    throw new AnalysisError(
      "REASON_REQUIRED",
      "Informe o motivo ao divergir da sugestão automática.",
    );
  }

  const { rows } = await pool.query(
    `INSERT INTO item_classification_decisions
       (tenant_id, company_id, invoice_item_id, purpose, source, suggestion_id, reason, decided_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING id, purpose, source, created_at`,
    [
      args.tenantId,
      item.rows[0].company_id,
      args.itemId,
      args.purpose,
      args.acceptSuggestion ? "system_accepted" : "user_override",
      suggestion.rows[0]?.id ?? null,
      args.reason?.trim() || null,
      args.actorUserId,
    ],
  );

  // Suggestion row remains — never deleted on override.
  await audit(pool, {
    tenantId: args.tenantId,
    actorUserId: args.actorUserId,
    action: "classification.decided",
    entityType: "invoice_item",
    entityId: args.itemId,
    detail: {
      purpose: args.purpose,
      source: rows[0].source,
      suggestionPreserved: Boolean(suggestion.rows[0]),
    },
  });

  return rows[0];
}

export async function saveManualTaxDecision(args: {
  tenantId: string;
  actorUserId: string;
  itemId: string;
  action: "follow_system" | "include_difal" | "exclude_difal" | "return_to_system_analysis";
  reason: string;
  icmsDifalManual?: string | null;
  fecpManual?: string | null;
}) {
  if (!args.reason.trim()) {
    throw new AnalysisError("REASON_REQUIRED", "Justificativa obrigatória para decisão manual.");
  }
  const pool = getPool();
  const item = await pool.query<{ id: string; company_id: string }>(
    `SELECT id, company_id FROM invoice_items WHERE id = $1 AND tenant_id = $2`,
    [args.itemId, args.tenantId],
  );
  if (!item.rows[0]) {
    throw new AnalysisError("ITEM_NOT_FOUND", "Item não encontrado.", 404);
  }

  const suggestion = await pool.query(
    `SELECT purpose, confidence, reasons FROM item_classification_suggestions WHERE invoice_item_id = $1`,
    [args.itemId],
  );
  const retention = await pool.query(
    `SELECT status, flags FROM item_retention_assessments WHERE invoice_item_id = $1`,
    [args.itemId],
  );

  // Soft-revoke previous active manual decision (history preserved).
  await pool.query(
    `UPDATE manual_tax_decisions SET revoked_at = NOW()
     WHERE invoice_item_id = $1 AND tenant_id = $2 AND revoked_at IS NULL`,
    [args.itemId, args.tenantId],
  );

  const snapshot = {
    classification: suggestion.rows[0] ?? null,
    retention: retention.rows[0] ?? null,
    preserved: true,
  };

  const { rows } = await pool.query(
    `INSERT INTO manual_tax_decisions
       (tenant_id, company_id, invoice_item_id, action, reason,
        icms_difal_manual, fecp_manual, suggestion_snapshot, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9)
     RETURNING id, action, reason, disclaimer, created_at`,
    [
      args.tenantId,
      item.rows[0].company_id,
      args.itemId,
      args.action,
      args.reason.trim(),
      args.icmsDifalManual ?? null,
      args.fecpManual ?? null,
      JSON.stringify(snapshot),
      args.actorUserId,
    ],
  );

  await audit(pool, {
    tenantId: args.tenantId,
    actorUserId: args.actorUserId,
    action: "manual_tax.decided",
    entityType: "invoice_item",
    entityId: args.itemId,
    detail: { action: args.action, automaticAnalysisPreserved: true },
  });

  return rows[0];
}

export async function listAnalysis(args: {
  tenantId: string;
  companyId: string;
}) {
  const pool = getPool();
  const { rows } = await pool.query(
    `SELECT
       i.id AS item_id,
       i.item_number,
       i.description,
       i.ncm,
       i.cfop_issuer,
       i.cest,
       h.id AS invoice_id,
       h.access_key,
       h.number AS invoice_number,
       h.emit_name,
       h.emit_uf,
       s.purpose AS suggested_purpose,
       s.confidence,
       s.reasons,
       s.id AS suggestion_id,
       d.purpose AS decided_purpose,
       d.source AS decision_source,
       d.reason AS decision_reason,
       d.created_at AS decided_at,
       r.status AS retention_status,
       r.flags AS retention_flags,
       r.warning_text AS retention_warning,
       m.action AS manual_action,
       m.reason AS manual_reason,
       m.disclaimer AS manual_disclaimer,
       m.suggestion_snapshot
     FROM invoice_items i
     JOIN invoice_headers h ON h.id = i.invoice_id
     LEFT JOIN item_classification_suggestions s ON s.invoice_item_id = i.id
     LEFT JOIN LATERAL (
       SELECT * FROM item_classification_decisions x
       WHERE x.invoice_item_id = i.id
       ORDER BY x.created_at DESC LIMIT 1
     ) d ON TRUE
     LEFT JOIN item_retention_assessments r ON r.invoice_item_id = i.id
     LEFT JOIN LATERAL (
       SELECT * FROM manual_tax_decisions y
       WHERE y.invoice_item_id = i.id AND y.revoked_at IS NULL
       ORDER BY y.created_at DESC LIMIT 1
     ) m ON TRUE
     WHERE i.tenant_id = $1 AND i.company_id = $2
     ORDER BY h.created_at DESC, i.item_number ASC`,
    [args.tenantId, args.companyId],
  );
  return rows;
}

import {
  DEMO_CASES,
  TAX_MODULES,
  evaluateItemTax,
  type IllustrativeInputs,
} from "@portal-difal/tax-engine";
import { getPool } from "./db";
import { audit } from "./session";

export class TaxRunError extends Error {
  status: number;
  code: string;
  constructor(code: string, message: string, status = 400) {
    super(message);
    this.name = "TaxRunError";
    this.code = code;
    this.status = status;
  }
}

export async function createTaxRun(args: {
  tenantId: string;
  companyId: string;
  actorUserId: string;
  mode: "production_pending" | "demo_arithmetic";
  demoCaseId?: keyof typeof DEMO_CASES;
}) {
  const pool = getPool();
  const company = await pool.query(
    `SELECT id, uf FROM companies WHERE id = $1 AND tenant_id = $2`,
    [args.companyId, args.tenantId],
  );
  if (!company.rows[0]) {
    throw new TaxRunError("COMPANY_NOT_FOUND", "Empresa não encontrada.", 404);
  }

  const module = TAX_MODULES.acquisitionContributor;

  const ruleVersion = await pool.query<{ id: string; status: string }>(
    `SELECT v.id, v.status
     FROM tax_rule_versions v
     JOIN tax_rules r ON r.id = v.tax_rule_id
     WHERE r.module = $1
     ORDER BY v.created_at DESC
     LIMIT 1`,
    [module],
  );

  const hasHomologated = ruleVersion.rows[0]?.status === "homologated";

  const benefit = await pool.query<{ id: string }>(
    `SELECT id FROM tax_benefits WHERE code = 'CONV_52_91_SCAFFOLD' LIMIT 1`,
  );

  // Load items with classification context
  const itemsFull = await pool.query<{
    id: string;
    product_value: string | null;
    icms_value: string | null;
    decided_purpose: string | null;
    suggested_purpose: string | null;
  }>(
    `SELECT i.id,
            i.product_value::text AS product_value,
            i.icms_value::text AS icms_value,
            d.purpose AS decided_purpose,
            s.purpose AS suggested_purpose
     FROM invoice_items i
     LEFT JOIN LATERAL (
       SELECT purpose FROM item_classification_decisions x
       WHERE x.invoice_item_id = i.id ORDER BY x.created_at DESC LIMIT 1
     ) d ON TRUE
     LEFT JOIN item_classification_suggestions s ON s.invoice_item_id = i.id
     WHERE i.tenant_id = $1 AND i.company_id = $2`,
    [args.tenantId, args.companyId],
  );

  const { rows: runRows } = await pool.query<{ id: string }>(
    `INSERT INTO tax_runs (tenant_id, company_id, module, status, rule_version_id, created_by)
     VALUES ($1,$2,$3,'completed_with_pendencies',$4,$5)
     RETURNING id`,
    [
      args.tenantId,
      args.companyId,
      module,
      ruleVersion.rows[0]?.id ?? null,
      args.actorUserId,
    ],
  );
  const runId = runRows[0]!.id;

  let demoInputs: IllustrativeInputs | null = null;
  if (args.mode === "demo_arithmetic") {
    const caseId = args.demoCaseId ?? "ARIT-A";
    const c = DEMO_CASES[caseId];
    if (!c) throw new TaxRunError("UNKNOWN_DEMO_CASE", "Caso aritmético desconhecido.");
    demoInputs = {
      operationValue: c.operationValue,
      originAmount: c.originAmount,
      grossUpRateFraction: c.grossUpRateFraction,
      destinationIcmsFraction: c.destinationIcmsFraction,
      fecpFraction: c.fecpFraction,
    };
  }

  const results = [];
  for (const item of itemsFull.rows) {
    const purpose = item.decided_purpose ?? item.suggested_purpose;
    const evalResult = evaluateItemTax({
      module,
      hasHomologatedRule: hasHomologated,
      destinationUf: company.rows[0].uf,
      purpose,
      demoArithmetic: demoInputs,
      benefitCandidate: true,
    });

    const scenarioIds: Record<string, string> = {};
    for (const sc of evalResult.scenarios) {
      const { rows: scRows } = await pool.query<{ id: string }>(
        `INSERT INTO tax_scenarios
           (tax_run_id, invoice_item_id, code, label, selected, benefit_id)
         VALUES ($1,$2,$3,$4,$5,$6)
         RETURNING id`,
        [
          runId,
          item.id,
          sc.code,
          sc.label,
          sc.code === "A_sem_beneficio",
          sc.code === "B_com_beneficio_condicionado" ? benefit.rows[0]?.id ?? null : null,
        ],
      );
      scenarioIds[sc.code] = scRows[0]!.id;
    }

    const { rows: resRows } = await pool.query<{ id: string }>(
      `INSERT INTO tax_item_results
         (tax_run_id, invoice_item_id, scenario_id, outcome, icms_difal, fecp, total, base,
          pending_fields, message)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10)
       RETURNING id`,
      [
        runId,
        item.id,
        scenarioIds.A_sem_beneficio ?? null,
        evalResult.outcome,
        evalResult.icmsDifal,
        evalResult.fecp,
        evalResult.total,
        evalResult.base,
        JSON.stringify(evalResult.pendingFields),
        evalResult.message,
      ],
    );

    let order = 1;
    for (const step of evalResult.steps) {
      await pool.query(
        `INSERT INTO tax_calculation_steps
           (tax_item_result_id, step_order, label, expression, value)
         VALUES ($1,$2,$3,$4,$5)`,
        [resRows[0]!.id, order++, step.label, step.expression, step.value],
      );
    }

    results.push({
      invoiceItemId: item.id,
      outcome: evalResult.outcome,
      message: evalResult.message,
      pendingFields: evalResult.pendingFields,
      icmsDifal: evalResult.icmsDifal,
      fecp: evalResult.fecp,
      total: evalResult.total,
      scenarios: evalResult.scenarios,
    });
  }

  // If no invoice items and demo mode, still record a synthetic demo result message on the run via audit.
  if (itemsFull.rows.length === 0 && args.mode === "demo_arithmetic" && demoInputs) {
    const evalResult = evaluateItemTax({
      module,
      hasHomologatedRule: false,
      demoArithmetic: demoInputs,
      benefitCandidate: true,
    });
    results.push({
      invoiceItemId: null,
      outcome: evalResult.outcome,
      message: evalResult.message,
      pendingFields: evalResult.pendingFields,
      icmsDifal: evalResult.icmsDifal,
      fecp: evalResult.fecp,
      total: evalResult.total,
      scenarios: evalResult.scenarios,
      steps: evalResult.steps,
    });
  }

  await audit(pool, {
    tenantId: args.tenantId,
    actorUserId: args.actorUserId,
    action: "tax_run.created",
    entityType: "tax_run",
    entityId: runId,
    detail: { mode: args.mode, module, hasHomologated },
  });

  return { runId, module, hasHomologated, results };
}

export async function getTaxRun(args: { tenantId: string; runId: string }) {
  const pool = getPool();
  const run = await pool.query(
    `SELECT * FROM tax_runs WHERE id = $1 AND tenant_id = $2`,
    [args.runId, args.tenantId],
  );
  if (!run.rows[0]) throw new TaxRunError("NOT_FOUND", "Tax run não encontrado.", 404);

  const results = await pool.query(
    `SELECT r.*, 
            (SELECT json_agg(json_build_object('order', s.step_order, 'label', s.label, 'expression', s.expression, 'value', s.value) ORDER BY s.step_order)
             FROM tax_calculation_steps s WHERE s.tax_item_result_id = r.id) AS steps
     FROM tax_item_results r
     WHERE r.tax_run_id = $1`,
    [args.runId],
  );
  const scenarios = await pool.query(
    `SELECT * FROM tax_scenarios WHERE tax_run_id = $1`,
    [args.runId],
  );
  return { run: run.rows[0], results: results.rows, scenarios: scenarios.rows };
}

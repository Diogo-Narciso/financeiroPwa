import { getPool } from "./db";
import { audit } from "./session";

export class BillingError extends Error {
  status: number;
  code: string;
  constructor(code: string, message: string, status = 400) {
    super(message);
    this.name = "BillingError";
    this.code = code;
    this.status = status;
  }
}

export async function listPlans() {
  const { rows } = await getPool().query(
    `SELECT p.id AS plan_id, p.code, p.name, p.kind, p.publishable,
            v.id AS plan_version_id, v.version_label, v.status,
            v.price_monthly_cents, v.is_price_placeholder, v.currency,
            v.commitment_months, v.billing_interval, v.limits, v.notes
     FROM plans p
     JOIN plan_versions v ON v.plan_id = p.id
     ORDER BY p.kind DESC, p.name, v.created_at`,
  );
  return rows.map((r) => ({
    ...r,
    price_display:
      r.price_monthly_cents == null
        ? null
        : {
            cents: r.price_monthly_cents,
            currency: r.currency,
            official: !r.is_price_placeholder && r.status === "approved" && r.publishable,
            label: r.is_price_placeholder
              ? "PLACEHOLDER — não é preço oficial"
              : "Preço configurado",
          },
  }));
}

/** Start or ensure trial subscription for tenant (idempotent). */
export async function ensureTrialSubscription(args: {
  tenantId: string;
  actorUserId: string;
}) {
  const pool = getPool();
  const existing = await pool.query(`SELECT id, status FROM subscriptions WHERE tenant_id = $1`, [
    args.tenantId,
  ]);
  if (existing.rows[0]) return existing.rows[0];

  const trial = await pool.query<{ id: string }>(
    `SELECT v.id FROM plan_versions v
     JOIN plans p ON p.id = v.plan_id
     WHERE p.code = 'trial' AND v.status = 'approved'
     ORDER BY v.created_at DESC LIMIT 1`,
  );
  if (!trial.rows[0]) {
    throw new BillingError("TRIAL_PLAN_MISSING", "Plano trial não configurado.", 500);
  }

  const { rows } = await pool.query(
    `INSERT INTO subscriptions
       (tenant_id, plan_version_id, status, contract_mode, current_period_start)
     VALUES ($1,$2,'trialing','trial', NOW())
     RETURNING id, status, contract_mode`,
    [args.tenantId, trial.rows[0].id],
  );

  await audit(pool, {
    tenantId: args.tenantId,
    actorUserId: args.actorUserId,
    action: "subscription.trial_started",
    entityType: "subscription",
    entityId: rows[0].id,
    detail: { provider: "mock_sandbox" },
  });

  return rows[0];
}

/**
 * Accept contract + attach plan version via MOCK/SANDBOX adapter.
 * Does NOT charge real money. Paid placeholder offers stay incomplete.
 */
export async function acceptPlanContract(args: {
  tenantId: string;
  actorUserId: string;
  planVersionId: string;
  contractMode:
    | "monthly_flexible"
    | "six_month_commitment"
    | "annual_commitment"
    | "negotiated"
    | "trial";
  acceptContractTemplateCode: string;
}) {
  const pool = getPool();
  const plan = await pool.query<{
    plan_version_id: string;
    plan_code: string;
    kind: string;
    publishable: boolean;
    status: string;
    price_monthly_cents: number | null;
    is_price_placeholder: boolean;
    commitment_months: number | null;
    name: string;
  }>(
    `SELECT v.id AS plan_version_id, p.code AS plan_code, p.kind, p.publishable,
            v.status, v.price_monthly_cents, v.is_price_placeholder,
            v.commitment_months, p.name
     FROM plan_versions v
     JOIN plans p ON p.id = v.plan_id
     WHERE v.id = $1`,
    [args.planVersionId],
  );
  const pv = plan.rows[0];
  if (!pv) throw new BillingError("PLAN_NOT_FOUND", "Versão de plano não encontrada.", 404);

  // Block activating paid offers that are placeholders / unpublished.
  const paidNotPublishable =
    pv.kind === "paid" &&
    (!pv.publishable || pv.is_price_placeholder || pv.status !== "approved");

  const template = await pool.query<{
    id: string;
    body_markdown: string;
    title: string;
    legal_review_status: string;
  }>(`SELECT id, body_markdown, title, legal_review_status FROM contract_templates WHERE code = $1`, [
    args.acceptContractTemplateCode,
  ]);
  if (!template.rows[0]) {
    throw new BillingError("TEMPLATE_NOT_FOUND", "Modelo de contrato não encontrado.", 404);
  }

  const mode = pv.kind === "trial" ? "trial" : args.contractMode;
  // Trial → trialing; paid placeholder → incomplete (scaffold only).
  const status =
    pv.kind === "trial" ? "trialing" : paidNotPublishable ? "incomplete" : "active";

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const existing = await client.query<{ id: string }>(
      `SELECT id FROM subscriptions WHERE tenant_id = $1`,
      [args.tenantId],
    );

    let subscriptionId: string;
    if (existing.rows[0]) {
      const upd = await client.query<{ id: string }>(
        `UPDATE subscriptions SET
           plan_version_id = $2,
           status = $3,
           contract_mode = $4,
           external_ref = 'mock_sandbox',
           updated_at = NOW()
         WHERE tenant_id = $1
         RETURNING id`,
        [args.tenantId, args.planVersionId, status, mode],
      );
      subscriptionId = upd.rows[0]!.id;
    } else {
      const ins = await client.query<{ id: string }>(
        `INSERT INTO subscriptions
           (tenant_id, plan_version_id, status, contract_mode, external_ref)
         VALUES ($1,$2,$3,$4,'mock_sandbox')
         RETURNING id`,
        [args.tenantId, args.planVersionId, status, mode],
      );
      subscriptionId = ins.rows[0]!.id;
    }

    await client.query(
      `UPDATE customer_contracts SET status = 'superseded'
       WHERE tenant_id = $1 AND status = 'accepted'`,
      [args.tenantId],
    );

    const snapshot = {
      schema_version: "1.0",
      accepted_at: new Date().toISOString(),
      template_code: args.acceptContractTemplateCode,
      template_title: template.rows[0].title,
      legal_review_status: template.rows[0].legal_review_status,
      body_markdown: template.rows[0].body_markdown,
      plan: {
        code: pv.plan_code,
        name: pv.name,
        plan_version_id: pv.plan_version_id,
        price_monthly_cents: pv.price_monthly_cents,
        is_price_placeholder: pv.is_price_placeholder,
        commitment_months: pv.commitment_months,
      },
      contract_mode: mode,
      renewal_default: "continuous_service_without_new_commitment",
      fixed_term_auto_renewal_enabled: false,
      provider: "mock_sandbox",
      offer_publishable: !paidNotPublishable,
      disclaimer:
        "MOCK/SANDBOX — sem cobrança real. Contrato imutável após aceite. Preços placeholder não são oficiais.",
    };

    const { rows: contractRows } = await client.query(
      `INSERT INTO customer_contracts
         (tenant_id, template_id, subscription_id, status, immutable_snapshot, accepted_at, accepted_by)
       VALUES ($1,$2,$3,'accepted',$4::jsonb, NOW(), $5)
       RETURNING id, status, accepted_at`,
      [
        args.tenantId,
        template.rows[0].id,
        subscriptionId,
        JSON.stringify(snapshot),
        args.actorUserId,
      ],
    );

    await client.query(`DELETE FROM renewal_events WHERE subscription_id = $1`, [subscriptionId]);
    await client.query(
      `INSERT INTO renewal_events (subscription_id, policy, enabled, notes)
       VALUES
         ($1, 'continuous_service_without_new_commitment', TRUE,
          'Padrão: continuidade sem nova fidelidade.'),
         ($1, 'fixed_term_auto_renewal_reviewed', FALSE,
          'Bloqueado até revisão jurídica.')`,
      [subscriptionId],
    );

    await client.query("COMMIT");

    await audit(pool, {
      tenantId: args.tenantId,
      actorUserId: args.actorUserId,
      action: "contract.accepted",
      entityType: "customer_contract",
      entityId: contractRows[0].id,
      detail: {
        subscriptionId,
        mode,
        status,
        provider: "mock_sandbox",
        paidNotPublishable,
      },
    });

    return {
      subscriptionId,
      contractId: contractRows[0].id,
      status,
      provider: "mock_sandbox" as const,
      offerPublishable: !paidNotPublishable,
      snapshot,
      warning: paidNotPublishable
        ? "Oferta paga não publicável (placeholder). Assinatura ficou incomplete — sem cobrança real."
        : undefined,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/** Idempotent mock webhook — duplicate idempotency_key returns existing. */
export async function processMockWebhook(args: {
  idempotencyKey: string;
  eventType: string;
  tenantId?: string;
  subscriptionId?: string;
  payload?: Record<string, unknown>;
}) {
  const pool = getPool();
  const existing = await pool.query(
    `SELECT id, event_type, processed_at FROM billing_events WHERE idempotency_key = $1`,
    [args.idempotencyKey],
  );
  if (existing.rows[0]) {
    return { duplicate: true, event: existing.rows[0] };
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      `INSERT INTO billing_events
         (tenant_id, subscription_id, provider, event_type, idempotency_key, payload)
       VALUES ($1,$2,'mock_sandbox',$3,$4,$5::jsonb)
       RETURNING id, event_type, processed_at`,
      [
        args.tenantId ?? null,
        args.subscriptionId ?? null,
        args.eventType,
        args.idempotencyKey,
        JSON.stringify(args.payload ?? {}),
      ],
    );

    if (args.subscriptionId && args.eventType === "payment.succeeded") {
      await client.query(
        `UPDATE subscriptions SET status = 'active', updated_at = NOW() WHERE id = $1`,
        [args.subscriptionId],
      );
    }
    if (args.subscriptionId && args.eventType === "payment.failed") {
      await client.query(
        `UPDATE subscriptions SET status = 'past_due', updated_at = NOW() WHERE id = $1`,
        [args.subscriptionId],
      );
    }

    await client.query("COMMIT");
    return { duplicate: false, event: rows[0] };
  } catch (error) {
    await client.query("ROLLBACK");
    const err = error as { code?: string };
    if (err.code === "23505") {
      const again = await pool.query(
        `SELECT id, event_type, processed_at FROM billing_events WHERE idempotency_key = $1`,
        [args.idempotencyKey],
      );
      return { duplicate: true, event: again.rows[0] };
    }
    throw error;
  } finally {
    client.release();
  }
}

export async function requestCancellation(args: {
  tenantId: string;
  actorUserId: string;
  reason: string;
}) {
  if (!args.reason.trim()) {
    throw new BillingError("REASON_REQUIRED", "Informe o motivo do cancelamento.");
  }
  const pool = getPool();
  const sub = await pool.query<{ id: string }>(
    `SELECT id FROM subscriptions WHERE tenant_id = $1`,
    [args.tenantId],
  );
  if (!sub.rows[0]) {
    throw new BillingError("NO_SUBSCRIPTION", "Nenhuma assinatura encontrada.", 404);
  }

  const { rows } = await pool.query(
    `INSERT INTO cancellation_requests
       (tenant_id, subscription_id, reason, fee_policy_status, status, created_by)
     VALUES ($1,$2,$3,'pending_legal_approval','received',$4)
     RETURNING id, status, fee_policy_status, created_at`,
    [args.tenantId, sub.rows[0].id, args.reason.trim(), args.actorUserId],
  );

  await pool.query(
    `UPDATE subscriptions SET cancel_at_period_end = TRUE, updated_at = NOW() WHERE id = $1`,
    [sub.rows[0].id],
  );

  await audit(pool, {
    tenantId: args.tenantId,
    actorUserId: args.actorUserId,
    action: "subscription.cancellation_requested",
    entityType: "cancellation_request",
    entityId: rows[0].id,
    detail: { fee_policy_status: "pending_legal_approval" },
  });

  return rows[0];
}

export async function getSubscription(tenantId: string) {
  const pool = getPool();
  const sub = await pool.query(
    `SELECT s.*, p.code AS plan_code, p.name AS plan_name, v.is_price_placeholder,
            v.price_monthly_cents, v.commitment_months
     FROM subscriptions s
     JOIN plan_versions v ON v.id = s.plan_version_id
     JOIN plans p ON p.id = v.plan_id
     WHERE s.tenant_id = $1`,
    [tenantId],
  );
  const contracts = await pool.query(
    `SELECT id, status, accepted_at, immutable_snapshot
     FROM customer_contracts WHERE tenant_id = $1 ORDER BY created_at DESC`,
    [tenantId],
  );
  const renewals = sub.rows[0]
    ? (
        await pool.query(
          `SELECT policy, enabled, notes FROM renewal_events WHERE subscription_id = $1`,
          [sub.rows[0].id],
        )
      ).rows
    : [];
  return { subscription: sub.rows[0] ?? null, contracts: contracts.rows, renewals };
}

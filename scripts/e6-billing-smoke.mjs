#!/usr/bin/env node
/** E6 smoke: plans, contract acceptance, immutable snapshot, idempotent mock webhook, cancel. */

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const jar = { cookie: "" };

async function api(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(jar.cookie ? { Cookie: jar.cookie } : {}),
      ...(opts.headers ?? {}),
    },
  });
  const raw = res.headers.get("set-cookie");
  if (raw && raw.includes("portal_difal_session=")) jar.cookie = raw.split(";")[0];
  return { status: res.status, data: await res.json().catch(() => ({})) };
}

function assert(c, m) {
  if (!c) throw new Error(m);
}

const stamp = Date.now();
const signup = await api("/api/auth/signup", {
  method: "POST",
  body: JSON.stringify({
    email: `e6smoke+${stamp}@example.com`,
    password: "senha-segura-1",
    displayName: "E6",
    orgName: `Org E6 ${stamp}`,
    orgKind: "accounting_firm",
  }),
});
assert(signup.status === 200, `signup ${JSON.stringify(signup)}`);

const plans = await api("/api/billing/plans");
assert(plans.status === 200, JSON.stringify(plans));
assert(plans.data.provider === "mock_sandbox", "provider label");
const trial = plans.data.plans.find((p) => p.code === "trial" && p.status === "approved");
assert(trial, "trial plan missing");
const paid = plans.data.plans.find((p) => p.kind === "paid" && p.is_price_placeholder);
assert(paid, "paid placeholder missing");
assert(paid.publishable === false, "paid must not be publishable");
assert(paid.price_display?.official === false, "placeholder must not be official");

const ensure = await api("/api/billing/subscription", {
  method: "POST",
  body: JSON.stringify({ action: "ensure_trial" }),
});
assert(ensure.status === 200 && ensure.data.ok, JSON.stringify(ensure));

const accept = await api("/api/billing/subscription", {
  method: "POST",
  body: JSON.stringify({
    action: "accept_contract",
    planVersionId: trial.plan_version_id,
    contractMode: "trial",
    acceptContractTemplateCode: "terms_trial_v1",
  }),
});
assert(accept.status === 200 && accept.data.ok, JSON.stringify(accept));
assert(accept.data.provider === "mock_sandbox", "accept provider");
assert(accept.data.snapshot?.body_markdown, "immutable snapshot body");
assert(accept.data.snapshot?.fixed_term_auto_renewal_enabled === false, "fixed-term blocked");
const subscriptionId = accept.data.subscriptionId;
const contractId = accept.data.contractId;

const sub = await api("/api/billing/subscription");
assert(sub.status === 200 && sub.data.subscription?.id === subscriptionId, "sub mismatch");
assert(sub.data.contracts.some((c) => c.id === contractId && c.status === "accepted"), "contract");
assert(
  sub.data.renewals.some(
    (r) => r.policy === "fixed_term_auto_renewal_reviewed" && r.enabled === false,
  ),
  "fixed-term renewal must be disabled",
);

const paidScaffold = await api("/api/billing/subscription", {
  method: "POST",
  body: JSON.stringify({
    action: "accept_contract",
    planVersionId: paid.plan_version_id,
    contractMode: "monthly_flexible",
    acceptContractTemplateCode: "terms_paid_placeholder_v1",
  }),
});
assert(paidScaffold.status === 200, JSON.stringify(paidScaffold));
assert(paidScaffold.data.status === "incomplete", "paid placeholder -> incomplete");
assert(paidScaffold.data.offerPublishable === false, "not publishable");

const key = `e6-smoke-pay-${stamp}`;
const wh1 = await api("/api/billing/webhook/mock", {
  method: "POST",
  body: JSON.stringify({
    idempotencyKey: key,
    eventType: "payment.succeeded",
    tenantId: undefined,
    subscriptionId: paidScaffold.data.subscriptionId,
    payload: { amount_cents: null, notice: "sandbox" },
  }),
});
assert(wh1.status === 200 && wh1.data.duplicate === false, JSON.stringify(wh1));

const wh2 = await api("/api/billing/webhook/mock", {
  method: "POST",
  body: JSON.stringify({
    idempotencyKey: key,
    eventType: "payment.succeeded",
    subscriptionId: paidScaffold.data.subscriptionId,
  }),
});
assert(wh2.status === 200 && wh2.data.duplicate === true, "webhook not idempotent");

const cancel = await api("/api/billing/cancel", {
  method: "POST",
  body: JSON.stringify({ reason: "E6 smoke — teste de cancelamento" }),
});
assert(cancel.status === 200 && cancel.data.ok, JSON.stringify(cancel));
assert(
  cancel.data.cancellation.fee_policy_status === "pending_legal_approval",
  "fee policy must stay pending",
);

console.log("E6 billing smoke OK", {
  contractId,
  subscriptionId: paidScaffold.data.subscriptionId,
  webhookId: wh1.data.event?.id,
  cancelId: cancel.data.cancellation.id,
});

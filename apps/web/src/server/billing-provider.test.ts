import assert from "node:assert/strict";
import {
  MockSandboxBillingProvider,
  UnconfiguredLiveBillingProvider,
  resolveBillingProvider,
} from "./billing-provider";

async function main() {
  const mock = new MockSandboxBillingProvider();
  const checkout = await mock.checkout({
    tenantId: "t1",
    planVersionId: "pv1",
    contractMode: "monthly_flexible",
    idempotencyKey: "idem-1",
  });
  assert.equal(checkout.provider, "mock_sandbox");
  assert.equal(checkout.status, "sandbox_only");
  assert.ok(checkout.externalRef.startsWith("mock_"));

  const wh = await mock.verifyAndNormalizeWebhook({
    idempotencyKey: "wh-1",
    eventType: "sandbox.ping",
    payload: { ok: true },
  });
  assert.equal(wh.signatureValid, true);
  assert.equal(wh.provider, "mock_sandbox");

  const live = new UnconfiguredLiveBillingProvider();
  const rejected = await live.checkout({
    tenantId: "t1",
    planVersionId: "pv1",
    contractMode: "monthly_flexible",
    idempotencyKey: "idem-2",
  });
  assert.equal(rejected.status, "rejected_unconfigured");
  assert.equal(rejected.externalRef, "");

  const liveWh = await live.verifyAndNormalizeWebhook({
    idempotencyKey: "wh-2",
    eventType: "payment.failed",
    payload: {},
  });
  assert.equal(liveWh.signatureValid, false);

  assert.equal(resolveBillingProvider(undefined).name, "mock_sandbox");
  assert.equal(resolveBillingProvider("mock_sandbox").name, "mock_sandbox");
  assert.equal(resolveBillingProvider("unconfigured_live").name, "unconfigured_live");

  console.log("OK H12 billing-provider PaymentAdapter spike");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import assert from "node:assert/strict";
import { TRIAL_LIMITS } from "./limits";
import {
  countActiveEntryUsage,
  countsTowardEntryQuota,
  evaluateCompanyQuota,
  evaluateEntryInvoiceQuota,
} from "./quota-policy";

assert.equal(TRIAL_LIMITS.maxCompaniesPerOrg, 3);
assert.equal(TRIAL_LIMITS.maxEntryInvoicesPerCompany, 5);

// CT-03 — company slots: happy path + block at 3
assert.deepEqual(evaluateCompanyQuota(0), { allowed: true });
assert.deepEqual(evaluateCompanyQuota(2), { allowed: true });
assert.deepEqual(evaluateCompanyQuota(3), {
  allowed: false,
  code: "TRIAL_COMPANY_LIMIT",
});
assert.deepEqual(evaluateCompanyQuota(4), {
  allowed: false,
  code: "TRIAL_COMPANY_LIMIT",
});

// CT-03 — entry NF-e: happy path + block at 5
assert.deepEqual(evaluateEntryInvoiceQuota(0), { allowed: true });
assert.deepEqual(evaluateEntryInvoiceQuota(4), { allowed: true });
assert.deepEqual(evaluateEntryInvoiceQuota(5), {
  allowed: false,
  code: "TRIAL_ENTRY_INVOICE_LIMIT",
});

// Liberação: released does not consume
assert.equal(countsTowardEntryQuota("reserved"), true);
assert.equal(countsTowardEntryQuota("committed"), true);
assert.equal(countsTowardEntryQuota("released"), false);

assert.equal(
  countActiveEntryUsage([
    "reserved",
    "committed",
    "released",
    "reserved",
    "committed",
    "committed",
    "released",
  ]),
  5,
);
// After one more reserved would block; with released freed, 4 active → still ok
assert.deepEqual(
  evaluateEntryInvoiceQuota(
    countActiveEntryUsage([
      "reserved",
      "committed",
      "released",
      "reserved",
      "committed",
      "released",
    ]),
  ),
  { allowed: true },
);

console.log("OK shared quota-policy (CT-03)");

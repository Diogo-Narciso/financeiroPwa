import assert from "node:assert/strict";
import { TAX_RUN_ROLES, canAccessTaxRun } from "./tax-run-role-gate";

assert.deepEqual([...TAX_RUN_ROLES], [
  "owner",
  "admin",
  "analyst",
  "reviewer",
]);

for (const role of TAX_RUN_ROLES) {
  assert.equal(canAccessTaxRun(role), true, role);
}

assert.equal(canAccessTaxRun("viewer"), false);
assert.equal(canAccessTaxRun("guest"), false);
assert.equal(canAccessTaxRun(""), false);
assert.equal(canAccessTaxRun("OWNER"), false);

console.log("OK H53 tax-run role gate 403 unit");

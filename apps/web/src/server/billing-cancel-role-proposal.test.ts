import assert from "node:assert/strict";
import {
  BILLING_CANCEL_ROLE_PROPOSAL,
  matchesBillingCancelRoleProposal,
} from "./billing-cancel-role-proposal";

assert.deepEqual([...BILLING_CANCEL_ROLE_PROPOSAL], ["owner", "admin"]);

for (const role of BILLING_CANCEL_ROLE_PROPOSAL) {
  assert.equal(matchesBillingCancelRoleProposal(role), true, role);
}

assert.equal(matchesBillingCancelRoleProposal("analyst"), false);
assert.equal(matchesBillingCancelRoleProposal("reviewer"), false);
assert.equal(matchesBillingCancelRoleProposal(""), false);

console.log("OK H92 billing/cancel role proposal harness");

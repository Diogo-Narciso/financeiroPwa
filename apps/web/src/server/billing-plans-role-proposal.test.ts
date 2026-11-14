import assert from "node:assert/strict";
import {
  BILLING_PLANS_ROLE_PROPOSAL,
  matchesBillingPlansRoleProposal,
} from "./billing-plans-role-proposal";

assert.deepEqual([...BILLING_PLANS_ROLE_PROPOSAL], ["owner", "admin"]);

for (const role of BILLING_PLANS_ROLE_PROPOSAL) {
  assert.equal(matchesBillingPlansRoleProposal(role), true, role);
}

assert.equal(matchesBillingPlansRoleProposal("analyst"), false);
assert.equal(matchesBillingPlansRoleProposal("reviewer"), false);
assert.equal(matchesBillingPlansRoleProposal(""), false);

console.log("OK H86 billing/plans role proposal harness");

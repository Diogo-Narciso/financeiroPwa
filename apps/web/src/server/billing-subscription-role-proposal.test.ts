import assert from "node:assert/strict";
import {
  BILLING_SUBSCRIPTION_ROLE_PROPOSAL,
  matchesBillingSubscriptionRoleProposal,
} from "./billing-subscription-role-proposal";

assert.deepEqual([...BILLING_SUBSCRIPTION_ROLE_PROPOSAL], ["owner", "admin"]);

for (const role of BILLING_SUBSCRIPTION_ROLE_PROPOSAL) {
  assert.equal(matchesBillingSubscriptionRoleProposal(role), true, role);
}

assert.equal(matchesBillingSubscriptionRoleProposal("analyst"), false);
assert.equal(matchesBillingSubscriptionRoleProposal("reviewer"), false);
assert.equal(matchesBillingSubscriptionRoleProposal(""), false);

console.log("OK H89 billing/subscription role proposal harness");

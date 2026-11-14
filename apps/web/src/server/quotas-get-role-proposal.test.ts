import assert from "node:assert/strict";
import {
  QUOTAS_GET_ROLE_PROPOSAL,
  matchesQuotasGetRoleProposal,
} from "./quotas-get-role-proposal";

assert.deepEqual([...QUOTAS_GET_ROLE_PROPOSAL], [
  "owner",
  "admin",
  "analyst",
  "reviewer",
]);

for (const role of QUOTAS_GET_ROLE_PROPOSAL) {
  assert.equal(matchesQuotasGetRoleProposal(role), true, role);
}

assert.equal(matchesQuotasGetRoleProposal("viewer"), false);
assert.equal(matchesQuotasGetRoleProposal("guest"), false);
assert.equal(matchesQuotasGetRoleProposal(""), false);

console.log("OK H80 quotas GET role proposal harness");

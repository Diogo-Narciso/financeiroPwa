import assert from "node:assert/strict";
import {
  QUOTAS_RESERVE_ROLE_PROPOSAL,
  matchesQuotasReserveRoleProposal,
} from "./quotas-reserve-role-proposal";

assert.deepEqual([...QUOTAS_RESERVE_ROLE_PROPOSAL], [
  "owner",
  "admin",
  "analyst",
]);

for (const role of QUOTAS_RESERVE_ROLE_PROPOSAL) {
  assert.equal(matchesQuotasReserveRoleProposal(role), true, role);
}

assert.equal(matchesQuotasReserveRoleProposal("reviewer"), false);
assert.equal(matchesQuotasReserveRoleProposal("guest"), false);
assert.equal(matchesQuotasReserveRoleProposal(""), false);

console.log("OK H77 quotas/reserve role proposal harness");

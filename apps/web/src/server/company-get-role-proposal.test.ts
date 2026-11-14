import assert from "node:assert/strict";
import {
  COMPANY_GET_ROLE_PROPOSAL,
  matchesCompanyGetRoleProposal,
} from "./company-get-role-proposal";

assert.deepEqual([...COMPANY_GET_ROLE_PROPOSAL], [
  "owner",
  "admin",
  "analyst",
  "reviewer",
]);

for (const role of COMPANY_GET_ROLE_PROPOSAL) {
  assert.equal(matchesCompanyGetRoleProposal(role), true, role);
}

assert.equal(matchesCompanyGetRoleProposal("viewer"), false);
assert.equal(matchesCompanyGetRoleProposal("guest"), false);
assert.equal(matchesCompanyGetRoleProposal(""), false);

console.log("OK H66 company GET role proposal harness");

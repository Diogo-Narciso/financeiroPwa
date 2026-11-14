import assert from "node:assert/strict";
import {
  IMPORTS_ID_ROLE_PROPOSAL,
  matchesImportsIdRoleProposal,
} from "./imports-id-role-proposal";

assert.deepEqual([...IMPORTS_ID_ROLE_PROPOSAL], [
  "owner",
  "admin",
  "analyst",
  "reviewer",
]);

for (const role of IMPORTS_ID_ROLE_PROPOSAL) {
  assert.equal(matchesImportsIdRoleProposal(role), true, role);
}

assert.equal(matchesImportsIdRoleProposal("viewer"), false);
assert.equal(matchesImportsIdRoleProposal("guest"), false);
assert.equal(matchesImportsIdRoleProposal(""), false);

console.log("OK H72 imports/[id] role proposal harness");

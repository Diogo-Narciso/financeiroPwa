import assert from "node:assert/strict";
import {
  INVOICES_LIST_ROLE_PROPOSAL,
  matchesInvoicesListRoleProposal,
} from "./invoices-list-role-proposal";

assert.deepEqual([...INVOICES_LIST_ROLE_PROPOSAL], [
  "owner",
  "admin",
  "analyst",
  "reviewer",
]);

for (const role of INVOICES_LIST_ROLE_PROPOSAL) {
  assert.equal(matchesInvoicesListRoleProposal(role), true, role);
}

assert.equal(matchesInvoicesListRoleProposal("viewer"), false);
assert.equal(matchesInvoicesListRoleProposal("guest"), false);
assert.equal(matchesInvoicesListRoleProposal(""), false);

console.log("OK H83 invoices list role proposal harness");

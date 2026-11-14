#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h83-invoices-list-harness.md"), "utf8");
const harness = readFileSync(
  join(root, "apps/web/src/server/invoices-list-role-proposal.ts"),
  "utf8",
);
const test = readFileSync(
  join(root, "apps/web/src/server/invoices-list-role-proposal.test.ts"),
  "utf8",
);
const route = readFileSync(
  join(root, "apps/web/src/app/api/invoices/route.ts"),
  "utf8",
);
const webPkg = readFileSync(join(root, "apps/web/package.json"), "utf8");

assert.match(doc, /H78|proposal/i);
assert.match(harness, /INVOICES_LIST_ROLE_PROPOSAL|matchesInvoicesListRoleProposal/);
assert.match(test, /matchesInvoicesListRoleProposal/);
assert.doesNotMatch(route, /matchesInvoicesListRoleProposal|INVOICES_LIST_ROLE_PROPOSAL/);
assert.match(webPkg, /invoices-list-role-proposal\.test\.ts/);
console.log("OK H83 invoices list role proposal harness contract");

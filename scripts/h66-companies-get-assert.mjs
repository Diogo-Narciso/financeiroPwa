#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h66-companies-get-harness.md"), "utf8");
const harness = readFileSync(
  join(root, "apps/web/src/server/company-get-role-proposal.ts"),
  "utf8",
);
const test = readFileSync(
  join(root, "apps/web/src/server/company-get-role-proposal.test.ts"),
  "utf8",
);
const route = readFileSync(
  join(root, "apps/web/src/app/api/companies/[id]/route.ts"),
  "utf8",
);
const webPkg = readFileSync(join(root, "apps/web/package.json"), "utf8");

assert.match(doc, /H60|H65|proposal/i);
assert.match(harness, /COMPANY_GET_ROLE_PROPOSAL|matchesCompanyGetRoleProposal/);
assert.match(test, /matchesCompanyGetRoleProposal/);
assert.doesNotMatch(route, /matchesCompanyGetRoleProposal|COMPANY_GET_ROLE_PROPOSAL/);
assert.match(webPkg, /company-get-role-proposal\.test\.ts/);
console.log("OK H66 companies GET role proposal harness contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h86-billing-plans-harness.md"), "utf8");
const harness = readFileSync(
  join(root, "apps/web/src/server/billing-plans-role-proposal.ts"),
  "utf8",
);
const test = readFileSync(
  join(root, "apps/web/src/server/billing-plans-role-proposal.test.ts"),
  "utf8",
);
const route = readFileSync(
  join(root, "apps/web/src/app/api/billing/plans/route.ts"),
  "utf8",
);
const webPkg = readFileSync(join(root, "apps/web/package.json"), "utf8");

assert.match(doc, /H84|proposal/i);
assert.match(harness, /BILLING_PLANS_ROLE_PROPOSAL|matchesBillingPlansRoleProposal/);
assert.match(test, /matchesBillingPlansRoleProposal/);
assert.doesNotMatch(route, /matchesBillingPlansRoleProposal|BILLING_PLANS_ROLE_PROPOSAL/);
assert.match(webPkg, /billing-plans-role-proposal\.test\.ts/);
console.log("OK H86 billing/plans role proposal harness contract");

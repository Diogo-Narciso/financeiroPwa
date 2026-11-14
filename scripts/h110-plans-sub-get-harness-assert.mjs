#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h110-plans-sub-get-harness.md"), "utf8");
const align = readFileSync(
  join(root, "docs/billing-plans-subscription-get-align.md"),
  "utf8",
);
const plansProp = readFileSync(
  join(root, "apps/web/src/server/billing-plans-role-proposal.ts"),
  "utf8",
);
const subProp = readFileSync(
  join(root, "apps/web/src/server/billing-subscription-role-proposal.ts"),
  "utf8",
);
const plansRoute = readFileSync(
  join(root, "apps/web/src/app/api/billing/plans/route.ts"),
  "utf8",
);
const subRoute = readFileSync(
  join(root, "apps/web/src/app/api/billing/subscription/route.ts"),
  "utf8",
);
assert.match(doc, /H106/);
assert.match(doc, /H86/);
assert.match(doc, /H89/);
assert.match(align, /GET/);
assert.match(plansProp, /matchesBillingPlansRoleProposal/);
assert.match(subProp, /matchesBillingSubscriptionRoleProposal/);
assert.doesNotMatch(plansRoute, /matchesBillingPlansRoleProposal/);
assert.doesNotMatch(subRoute, /matchesBillingSubscriptionRoleProposal/);
console.log("OK H110 plans↔subscription GET harness contract");

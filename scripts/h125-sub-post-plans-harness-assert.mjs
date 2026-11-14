#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h125-sub-post-plans-get-harness.md"), "utf8");
const align = readFileSync(
  join(root, "docs/billing-subscription-post-plans-get-align.md"),
  "utf8",
);
const subProp = readFileSync(
  join(root, "apps/web/src/server/billing-subscription-role-proposal.ts"),
  "utf8",
);
const plansProp = readFileSync(
  join(root, "apps/web/src/server/billing-plans-role-proposal.ts"),
  "utf8",
);
const subRoute = readFileSync(
  join(root, "apps/web/src/app/api/billing/subscription/route.ts"),
  "utf8",
);
const plansRoute = readFileSync(
  join(root, "apps/web/src/app/api/billing/plans/route.ts"),
  "utf8",
);
assert.match(doc, /H121/);
assert.match(doc, /H89/);
assert.match(doc, /H86/);
assert.match(align, /POST|GET/);
assert.match(subProp, /matchesBillingSubscriptionRoleProposal/);
assert.match(plansProp, /matchesBillingPlansRoleProposal/);
assert.doesNotMatch(subRoute, /matchesBillingSubscriptionRoleProposal/);
assert.doesNotMatch(plansRoute, /matchesBillingPlansRoleProposal/);
console.log("OK H125 subscription POST ↔ plans GET harness contract");

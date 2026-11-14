#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h101-cancel-sub-align-harness.md"), "utf8");
const align = readFileSync(
  join(root, "docs/billing-cancel-subscription-roles-align.md"),
  "utf8",
);
const subProp = readFileSync(
  join(root, "apps/web/src/server/billing-subscription-role-proposal.ts"),
  "utf8",
);
const cancelProp = readFileSync(
  join(root, "apps/web/src/server/billing-cancel-role-proposal.ts"),
  "utf8",
);
const subRoute = readFileSync(
  join(root, "apps/web/src/app/api/billing/subscription/route.ts"),
  "utf8",
);
const cancelRoute = readFileSync(
  join(root, "apps/web/src/app/api/billing/cancel/route.ts"),
  "utf8",
);
assert.match(doc, /H96/);
assert.match(doc, /H89/);
assert.match(doc, /H92/);
assert.match(align, /owner.*admin/i);
assert.match(subProp, /matchesBillingSubscriptionRoleProposal/);
assert.match(cancelProp, /matchesBillingCancelRoleProposal/);
assert.doesNotMatch(subRoute, /matchesBillingSubscriptionRoleProposal/);
assert.doesNotMatch(cancelRoute, /matchesBillingCancelRoleProposal/);
console.log("OK H101 cancel ↔ subscription align harness contract");

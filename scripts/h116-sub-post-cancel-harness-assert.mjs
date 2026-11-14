#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h116-sub-post-cancel-harness.md"), "utf8");
const align = readFileSync(
  join(root, "docs/billing-subscription-post-cancel-align.md"),
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
assert.match(doc, /H112/);
assert.match(doc, /H89/);
assert.match(doc, /H92/);
assert.match(align, /POST/);
assert.match(subProp, /matchesBillingSubscriptionRoleProposal/);
assert.match(cancelProp, /matchesBillingCancelRoleProposal/);
assert.doesNotMatch(subRoute, /matchesBillingSubscriptionRoleProposal/);
assert.doesNotMatch(cancelRoute, /matchesBillingCancelRoleProposal/);
console.log("OK H116 subscription POST ↔ cancel harness contract");

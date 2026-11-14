#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h136-sub-cancel-refresh-harness.md"), "utf8");
const refresh = readFileSync(join(root, "docs/billing-sub-post-cancel-refresh.md"), "utf8");
const subProp = readFileSync(join(root, "apps/web/src/server/billing-subscription-role-proposal.ts"), "utf8");
const cancelProp = readFileSync(join(root, "apps/web/src/server/billing-cancel-role-proposal.ts"), "utf8");
const subRoute = readFileSync(join(root, "apps/web/src/app/api/billing/subscription/route.ts"), "utf8");
const cancelRoute = readFileSync(join(root, "apps/web/src/app/api/billing/cancel/route.ts"), "utf8");
assert.match(doc, /H130/);
assert.match(doc, /H89/);
assert.match(doc, /H92/);
assert.match(refresh, /POST/);
assert.match(subProp, /matchesBillingSubscriptionRoleProposal/);
assert.match(cancelProp, /matchesBillingCancelRoleProposal/);
assert.doesNotMatch(subRoute, /matchesBillingSubscriptionRoleProposal/);
assert.doesNotMatch(cancelRoute, /matchesBillingCancelRoleProposal/);
console.log("OK H136 subscription POST ↔ cancel refresh harness contract");

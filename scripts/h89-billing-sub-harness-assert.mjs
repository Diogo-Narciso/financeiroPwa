#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(
  join(root, "docs/h89-billing-subscription-harness.md"),
  "utf8",
);
const harness = readFileSync(
  join(root, "apps/web/src/server/billing-subscription-role-proposal.ts"),
  "utf8",
);
const test = readFileSync(
  join(root, "apps/web/src/server/billing-subscription-role-proposal.test.ts"),
  "utf8",
);
const route = readFileSync(
  join(root, "apps/web/src/app/api/billing/subscription/route.ts"),
  "utf8",
);
const webPkg = readFileSync(join(root, "apps/web/package.json"), "utf8");

assert.match(doc, /H88|proposal/i);
assert.match(
  harness,
  /BILLING_SUBSCRIPTION_ROLE_PROPOSAL|matchesBillingSubscriptionRoleProposal/,
);
assert.match(test, /matchesBillingSubscriptionRoleProposal/);
assert.doesNotMatch(
  route,
  /matchesBillingSubscriptionRoleProposal|BILLING_SUBSCRIPTION_ROLE_PROPOSAL/,
);
assert.match(webPkg, /billing-subscription-role-proposal\.test\.ts/);
console.log("OK H89 billing/subscription role proposal harness contract");

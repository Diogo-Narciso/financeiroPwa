#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/dual-glossary-h89-index.md"), "utf8");
const prop = readFileSync(
  join(root, "apps/web/src/server/billing-subscription-role-proposal.ts"),
  "utf8",
);
const route = readFileSync(
  join(root, "apps/web/src/app/api/billing/subscription/route.ts"),
  "utf8",
);
assert.match(doc, /H103/);
assert.match(doc, /H89/);
assert.match(doc, /matchesBillingSubscriptionRoleProposal/);
assert.ok(existsSync(join(root, "docs/dual-method-proposal-glossary-cross.md")));
assert.match(prop, /matchesBillingSubscriptionRoleProposal/);
assert.doesNotMatch(route, /matchesBillingSubscriptionRoleProposal/);
console.log("OK H108 dual-glossary ↔ H89 index contract");

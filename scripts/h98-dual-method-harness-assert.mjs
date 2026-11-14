#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h98-dual-method-harness.md"), "utf8");
const note = readFileSync(
  join(root, "docs/billing-subscription-dual-method-note.md"),
  "utf8",
);
const harness = readFileSync(
  join(root, "apps/web/src/server/billing-subscription-role-proposal.ts"),
  "utf8",
);
const route = readFileSync(
  join(root, "apps/web/src/app/api/billing/subscription/route.ts"),
  "utf8",
);
assert.match(doc, /H94/);
assert.match(doc, /H89/);
assert.match(doc, /GET/);
assert.match(doc, /POST/);
assert.match(note, /dual|GET|POST/i);
assert.match(harness, /BILLING_SUBSCRIPTION_ROLE_PROPOSAL|matchesBillingSubscriptionRoleProposal/);
assert.match(route, /export async function GET/);
assert.match(route, /export async function POST/);
assert.doesNotMatch(route, /matchesBillingSubscriptionRoleProposal|BILLING_SUBSCRIPTION_ROLE_PROPOSAL/);
console.log("OK H98 dual-method subscription harness contract");

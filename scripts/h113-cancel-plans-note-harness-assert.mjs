#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(
  join(root, "docs/h113-cancel-plans-note-harness.md"),
  "utf8",
);
const note = readFileSync(
  join(root, "docs/billing-cancel-plans-method-note.md"),
  "utf8",
);
const plansProp = readFileSync(
  join(root, "apps/web/src/server/billing-plans-role-proposal.ts"),
  "utf8",
);
const cancelProp = readFileSync(
  join(root, "apps/web/src/server/billing-cancel-role-proposal.ts"),
  "utf8",
);
const plansRoute = readFileSync(
  join(root, "apps/web/src/app/api/billing/plans/route.ts"),
  "utf8",
);
const cancelRoute = readFileSync(
  join(root, "apps/web/src/app/api/billing/cancel/route.ts"),
  "utf8",
);
assert.match(doc, /H109/);
assert.match(doc, /H86/);
assert.match(doc, /H92/);
assert.match(note, /GET/);
assert.match(note, /POST/);
assert.match(plansProp, /matchesBillingPlansRoleProposal/);
assert.match(cancelProp, /matchesBillingCancelRoleProposal/);
assert.doesNotMatch(plansRoute, /matchesBillingPlansRoleProposal/);
assert.doesNotMatch(cancelRoute, /matchesBillingCancelRoleProposal/);
console.log("OK H113 cancel↔plans method note harness contract");

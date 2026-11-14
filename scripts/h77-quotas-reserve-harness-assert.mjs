#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h77-quotas-reserve-harness.md"), "utf8");
const harness = readFileSync(
  join(root, "apps/web/src/server/quotas-reserve-role-proposal.ts"),
  "utf8",
);
const test = readFileSync(
  join(root, "apps/web/src/server/quotas-reserve-role-proposal.test.ts"),
  "utf8",
);
const route = readFileSync(
  join(root, "apps/web/src/app/api/quotas/entry-invoices/reserve/route.ts"),
  "utf8",
);
const webPkg = readFileSync(join(root, "apps/web/package.json"), "utf8");

assert.match(doc, /H71|proposal/i);
assert.match(harness, /QUOTAS_RESERVE_ROLE_PROPOSAL|matchesQuotasReserveRoleProposal/);
assert.match(test, /matchesQuotasReserveRoleProposal/);
assert.doesNotMatch(route, /matchesQuotasReserveRoleProposal|QUOTAS_RESERVE_ROLE_PROPOSAL/);
assert.match(webPkg, /quotas-reserve-role-proposal\.test\.ts/);
console.log("OK H77 quotas/reserve role proposal harness contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h80-quotas-get-harness.md"), "utf8");
const harness = readFileSync(
  join(root, "apps/web/src/server/quotas-get-role-proposal.ts"),
  "utf8",
);
const test = readFileSync(
  join(root, "apps/web/src/server/quotas-get-role-proposal.test.ts"),
  "utf8",
);
const route = readFileSync(
  join(root, "apps/web/src/app/api/quotas/route.ts"),
  "utf8",
);
const webPkg = readFileSync(join(root, "apps/web/package.json"), "utf8");

assert.match(doc, /H74|proposal/i);
assert.match(harness, /QUOTAS_GET_ROLE_PROPOSAL|matchesQuotasGetRoleProposal/);
assert.match(test, /matchesQuotasGetRoleProposal/);
assert.doesNotMatch(route, /matchesQuotasGetRoleProposal|QUOTAS_GET_ROLE_PROPOSAL/);
assert.match(webPkg, /quotas-get-role-proposal\.test\.ts/);
console.log("OK H80 quotas GET role proposal harness contract");

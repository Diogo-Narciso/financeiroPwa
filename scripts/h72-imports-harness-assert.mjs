#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h72-imports-id-harness.md"), "utf8");
const harness = readFileSync(
  join(root, "apps/web/src/server/imports-id-role-proposal.ts"),
  "utf8",
);
const test = readFileSync(
  join(root, "apps/web/src/server/imports-id-role-proposal.test.ts"),
  "utf8",
);
const route = readFileSync(
  join(root, "apps/web/src/app/api/imports/[id]/route.ts"),
  "utf8",
);
const webPkg = readFileSync(join(root, "apps/web/package.json"), "utf8");

assert.match(doc, /H68|proposal/i);
assert.match(harness, /IMPORTS_ID_ROLE_PROPOSAL|matchesImportsIdRoleProposal/);
assert.match(test, /matchesImportsIdRoleProposal/);
assert.doesNotMatch(route, /matchesImportsIdRoleProposal|IMPORTS_ID_ROLE_PROPOSAL/);
assert.match(webPkg, /imports-id-role-proposal\.test\.ts/);
console.log("OK H72 imports/[id] role proposal harness contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h53-tax-runs-403-unit.md"), "utf8");
const gate = readFileSync(
  join(root, "apps/web/src/server/tax-run-role-gate.ts"),
  "utf8",
);
const test = readFileSync(
  join(root, "apps/web/src/server/tax-run-role-gate.test.ts"),
  "utf8",
);
const route = readFileSync(
  join(root, "apps/web/src/app/api/tax-runs/[id]/route.ts"),
  "utf8",
);
const webPkg = readFileSync(join(root, "apps/web/package.json"), "utf8");

assert.match(doc, /H48|E-R02/);
assert.match(doc, /403/);
assert.match(gate, /canAccessTaxRun/);
assert.match(gate, /TAX_RUN_ROLES/);
assert.match(test, /canAccessTaxRun/);
assert.match(test, /viewer|false/);
assert.match(route, /canAccessTaxRun/);
assert.match(webPkg, /tax-run-role-gate\.test\.ts/);
console.log("OK H53 tax-runs 403 unit contract");

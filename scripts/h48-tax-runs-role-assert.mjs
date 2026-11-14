#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h48-tax-runs-role-align.md"), "utf8");
const route = readFileSync(
  join(root, "apps/web/src/app/api/tax-runs/[id]/route.ts"),
  "utf8",
);
assert.match(doc, /E-R02/);
assert.match(doc, /owner.*admin.*analyst.*reviewer|owner \| admin/);
// H53: roles live in tax-run-role-gate; route uses canAccessTaxRun
const literal = /\["owner", "admin", "analyst", "reviewer"\]/;
if (!literal.test(route)) {
  assert.match(route, /canAccessTaxRun/);
  const gate = readFileSync(
    join(root, "apps/web/src/server/tax-run-role-gate.ts"),
    "utf8",
  );
  assert.match(gate, /TAX_RUN_ROLES/);
  assert.match(gate, /"owner"/);
  assert.match(gate, /"admin"/);
  assert.match(gate, /"analyst"/);
  assert.match(gate, /"reviewer"/);
}
assert.match(route, /403/);
console.log("OK H48 tax-runs/[id] role align contract");

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
assert.match(route, /\["owner", "admin", "analyst", "reviewer"\]/);
assert.match(route, /403/);
console.log("OK H48 tax-runs/[id] role align contract");

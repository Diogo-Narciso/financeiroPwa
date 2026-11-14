#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h58-tax-runs-post-helper.md"), "utf8");
const route = readFileSync(
  join(root, "apps/web/src/app/api/tax-runs/route.ts"),
  "utf8",
);
assert.match(doc, /H53|canAccessTaxRun/);
assert.match(route, /canAccessTaxRun/);
assert.match(route, /403/);
console.log("OK H58 tax-runs POST helper contract");

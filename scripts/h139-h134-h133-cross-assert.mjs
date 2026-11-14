#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h134-h133-crossindex.md"), "utf8");
assert.match(doc, /H134/);
assert.match(doc, /H133/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h129-h128-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h133-dual-cancel-refresh-harness.md")));
console.log("OK H139 H134 ↔ H133 billing crossindex contract");

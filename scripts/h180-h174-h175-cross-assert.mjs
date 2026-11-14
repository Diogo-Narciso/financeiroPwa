#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h174-h175-crossindex.md"), "utf8");
assert.match(doc, /H174/);
assert.match(doc, /H175/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h168-h169-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h175-cancel-plans-refresh7-harness.md")));
console.log("OK H180 H174 ↔ H175 billing crossindex contract");

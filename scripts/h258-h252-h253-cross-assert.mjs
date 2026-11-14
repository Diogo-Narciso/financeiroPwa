#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h252-h253-crossindex.md"), "utf8");
assert.match(doc, /H252/);
assert.match(doc, /H253/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h246-h247-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h248-dual-cancel-refresh22-harness.md")));
console.log("OK H258 H252 ↔ H253 billing crossindex contract");

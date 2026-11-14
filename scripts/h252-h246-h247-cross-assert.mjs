#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h246-h247-crossindex.md"), "utf8");
assert.match(doc, /H246/);
assert.match(doc, /H247/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h240-h241-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h242-dual-cancel-refresh21-harness.md")));
console.log("OK H252 H246 ↔ H247 billing crossindex contract");

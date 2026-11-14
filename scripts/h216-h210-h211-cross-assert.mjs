#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h210-h211-crossindex.md"), "utf8");
assert.match(doc, /H210/);
assert.match(doc, /H211/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h204-h205-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h206-cancel-plans-refresh13-harness.md")));
console.log("OK H216 H210 ↔ H211 billing crossindex contract");

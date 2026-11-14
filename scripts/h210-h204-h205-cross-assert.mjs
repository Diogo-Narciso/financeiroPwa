#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h204-h205-crossindex.md"), "utf8");
assert.match(doc, /H204/);
assert.match(doc, /H205/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h198-h199-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h200-cancel-plans-refresh12-harness.md")));
console.log("OK H210 H204 ↔ H205 billing crossindex contract");

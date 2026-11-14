#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h156-h157-crossindex.md"), "utf8");
assert.match(doc, /H156/);
assert.match(doc, /H157/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h150-h151-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h157-cancel-plans-refresh4-harness.md")));
console.log("OK H162 H156 ↔ H157 billing crossindex contract");

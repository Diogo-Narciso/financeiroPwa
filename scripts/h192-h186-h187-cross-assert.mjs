#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h186-h187-crossindex.md"), "utf8");
assert.match(doc, /H186/);
assert.match(doc, /H187/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h180-h181-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h187-cancel-plans-refresh9-harness.md")));
console.log("OK H192 H186 ↔ H187 billing crossindex contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h192-h193-crossindex.md"), "utf8");
assert.match(doc, /H192/);
assert.match(doc, /H193/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h186-h187-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h193-cancel-plans-refresh10-harness.md")));
console.log("OK H198 H192 ↔ H193 billing crossindex contract");

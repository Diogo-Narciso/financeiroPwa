#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h198-h199-crossindex.md"), "utf8");
assert.match(doc, /H198/);
assert.match(doc, /H199/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h192-h193-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h194-cancel-plans-refresh11-harness.md")));
console.log("OK H204 H198 ↔ H199 billing crossindex contract");

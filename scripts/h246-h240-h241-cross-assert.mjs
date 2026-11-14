#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h240-h241-crossindex.md"), "utf8");
assert.match(doc, /H240/);
assert.match(doc, /H241/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h234-h235-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h236-dual-cancel-refresh20-harness.md")));
console.log("OK H246 H240 ↔ H241 billing crossindex contract");

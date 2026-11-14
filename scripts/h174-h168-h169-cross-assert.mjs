#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h168-h169-crossindex.md"), "utf8");
assert.match(doc, /H168/);
assert.match(doc, /H169/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h162-h163-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h169-cancel-plans-refresh6-harness.md")));
console.log("OK H174 H168 ↔ H169 billing crossindex contract");

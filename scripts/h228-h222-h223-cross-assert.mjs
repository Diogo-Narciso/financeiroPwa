#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h222-h223-crossindex.md"), "utf8");
assert.match(doc, /H222/);
assert.match(doc, /H223/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h216-h217-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h218-cancel-plans-refresh15-harness.md")));
console.log("OK H228 H222 ↔ H223 billing crossindex contract");

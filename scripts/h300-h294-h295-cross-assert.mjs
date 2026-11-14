#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h294-h295-crossindex.md"), "utf8");
assert.match(doc, /H294/);
assert.match(doc, /H295/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h288-h289-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h290-dual-cancel-refresh29-harness.md")));
console.log("OK H300 H294 ↔ H295 billing crossindex contract");

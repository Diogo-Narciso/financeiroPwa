#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h200-h201-crossindex.md"), "utf8");
assert.match(doc, /H200/);
assert.match(doc, /H201/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh12.md")));
assert.ok(existsSync(join(root, "docs/billing-h194-h195-crossindex.md")));
console.log("OK H207 H200 ↔ H201 billing crossindex contract");

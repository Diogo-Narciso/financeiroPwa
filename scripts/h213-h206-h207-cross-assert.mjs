#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h206-h207-crossindex.md"), "utf8");
assert.match(doc, /H206/);
assert.match(doc, /H207/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh13.md")));
assert.ok(existsSync(join(root, "docs/billing-h200-h201-crossindex.md")));
console.log("OK H213 H206 ↔ H207 billing crossindex contract");

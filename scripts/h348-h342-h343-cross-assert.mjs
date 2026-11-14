#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h342-h343-crossindex.md"), "utf8");
assert.match(doc, /H342/);
assert.match(doc, /H343/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h336-h337-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h338-dual-cancel-refresh37-harness.md")));
console.log("OK H348 H342 ↔ H343 billing crossindex contract");

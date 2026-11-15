#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h348-h349-crossindex.md"), "utf8");
assert.match(doc, /H348/);
assert.match(doc, /H349/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h342-h343-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h344-dual-cancel-refresh38-harness.md")));
console.log("OK H354 H348 ↔ H349 billing crossindex contract");

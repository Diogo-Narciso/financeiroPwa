#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h216-h217-crossindex.md"), "utf8");
assert.match(doc, /H216/);
assert.match(doc, /H217/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h210-h211-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h212-cancel-plans-refresh14-harness.md")));
console.log("OK H222 H216 ↔ H217 billing crossindex contract");

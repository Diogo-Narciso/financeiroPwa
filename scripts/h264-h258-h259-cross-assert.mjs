#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h258-h259-crossindex.md"), "utf8");
assert.match(doc, /H258/);
assert.match(doc, /H259/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h252-h253-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h254-dual-cancel-refresh23-harness.md")));
console.log("OK H264 H258 ↔ H259 billing crossindex contract");

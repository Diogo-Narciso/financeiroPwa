#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h312-h313-crossindex.md"), "utf8");
assert.match(doc, /H312/);
assert.match(doc, /H313/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h306-h307-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h308-dual-cancel-refresh32-harness.md")));
console.log("OK H318 H312 ↔ H313 billing crossindex contract");

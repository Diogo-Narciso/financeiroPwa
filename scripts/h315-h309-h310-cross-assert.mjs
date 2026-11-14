#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h309-h310-crossindex.md"), "utf8");
assert.match(doc, /H309/);
assert.match(doc, /H310/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h303-h304-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh30.md")));
console.log("OK H315 H309 ↔ H310 billing crossindex contract");

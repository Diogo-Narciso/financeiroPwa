#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h306-h307-crossindex.md"), "utf8");
assert.match(doc, /H306/);
assert.match(doc, /H307/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h300-h301-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h302-dual-cancel-refresh31-harness.md")));
console.log("OK H312 H306 ↔ H307 billing crossindex contract");

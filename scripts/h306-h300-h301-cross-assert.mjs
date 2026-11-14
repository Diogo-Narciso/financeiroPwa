#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h300-h301-crossindex.md"), "utf8");
assert.match(doc, /H300/);
assert.match(doc, /H301/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h294-h295-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h296-dual-cancel-refresh30-harness.md")));
console.log("OK H306 H300 ↔ H301 billing crossindex contract");

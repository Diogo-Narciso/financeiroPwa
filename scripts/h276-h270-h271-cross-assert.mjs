#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h270-h271-crossindex.md"), "utf8");
assert.match(doc, /H270/);
assert.match(doc, /H271/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h264-h265-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h266-dual-cancel-refresh25-harness.md")));
console.log("OK H276 H270 ↔ H271 billing crossindex contract");

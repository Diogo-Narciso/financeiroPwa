#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h285-h286-crossindex.md"), "utf8");
assert.match(doc, /H285/);
assert.match(doc, /H286/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h279-h280-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh26.md")));
console.log("OK H291 H285 ↔ H286 billing crossindex contract");

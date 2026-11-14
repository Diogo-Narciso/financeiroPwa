#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h279-h280-crossindex.md"), "utf8");
assert.match(doc, /H279/);
assert.match(doc, /H280/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h273-h274-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh25.md")));
console.log("OK H285 H279 ↔ H280 billing crossindex contract");

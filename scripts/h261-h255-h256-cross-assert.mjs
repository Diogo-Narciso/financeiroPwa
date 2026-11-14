#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h255-h256-crossindex.md"), "utf8");
assert.match(doc, /H255/);
assert.match(doc, /H256/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h249-h250-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh21.md")));
console.log("OK H261 H255 ↔ H256 billing crossindex contract");

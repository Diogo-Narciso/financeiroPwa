#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h249-h250-crossindex.md"), "utf8");
assert.match(doc, /H249/);
assert.match(doc, /H250/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h243-h244-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh20.md")));
console.log("OK H255 H249 ↔ H250 billing crossindex contract");

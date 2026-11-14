#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h243-h244-crossindex.md"), "utf8");
assert.match(doc, /H243/);
assert.match(doc, /H244/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h237-h238-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh19.md")));
console.log("OK H249 H243 ↔ H244 billing crossindex contract");

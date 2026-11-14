#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h303-h304-crossindex.md"), "utf8");
assert.match(doc, /H303/);
assert.match(doc, /H304/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h297-h298-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh29.md")));
console.log("OK H309 H303 ↔ H304 billing crossindex contract");

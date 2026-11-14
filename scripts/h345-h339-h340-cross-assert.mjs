#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h339-h340-crossindex.md"), "utf8");
assert.match(doc, /H339/);
assert.match(doc, /H340/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h333-h334-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh35.md")));
console.log("OK H345 H339 ↔ H340 billing crossindex contract");

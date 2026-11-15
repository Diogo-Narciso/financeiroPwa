#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h345-h346-crossindex.md"), "utf8");
assert.match(doc, /H345/);
assert.match(doc, /H346/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h339-h340-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh36.md")));
console.log("OK H351 H345 ↔ H346 billing crossindex contract");

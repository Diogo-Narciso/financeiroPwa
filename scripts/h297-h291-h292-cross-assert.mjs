#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h291-h292-crossindex.md"), "utf8");
assert.match(doc, /H291/);
assert.match(doc, /H292/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h285-h286-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh27.md")));
console.log("OK H297 H291 ↔ H292 billing crossindex contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h231-h232-crossindex.md"), "utf8");
assert.match(doc, /H231/);
assert.match(doc, /H232/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h225-h226-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh17.md")));
console.log("OK H237 H231 ↔ H232 billing crossindex contract");

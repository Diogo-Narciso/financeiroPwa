#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h139-h140-crossindex.md"), "utf8");
assert.match(doc, /H139/);
assert.match(doc, /H140/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h134-h133-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h140-cancel-plans-refresh2-harness.md")));
console.log("OK H144 H139 ↔ H140 billing crossindex contract");

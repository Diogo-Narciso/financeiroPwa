#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h333-h334-crossindex.md"), "utf8");
assert.match(doc, /H333/);
assert.match(doc, /H334/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h327-h328-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh34.md")));
console.log("OK H339 H333 ↔ H334 billing crossindex contract");

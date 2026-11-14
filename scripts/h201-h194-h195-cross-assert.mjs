#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h194-h195-crossindex.md"), "utf8");
assert.match(doc, /H194/);
assert.match(doc, /H195/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh11.md")));
assert.ok(existsSync(join(root, "docs/h189-h183-dual-chain-index.md")));
console.log("OK H201 H194 ↔ H195 billing crossindex contract");

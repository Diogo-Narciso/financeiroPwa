#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h162-h163-crossindex.md"), "utf8");
assert.match(doc, /H162/);
assert.match(doc, /H163/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h156-h157-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h163-cancel-plans-refresh5-harness.md")));
console.log("OK H168 H162 ↔ H163 billing crossindex contract");

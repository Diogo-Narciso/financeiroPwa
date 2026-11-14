#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h219-h220-crossindex.md"), "utf8");
assert.match(doc, /H219/);
assert.match(doc, /H220/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h212-h213-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh15.md")));
console.log("OK H225 H219 ↔ H220 billing crossindex contract");

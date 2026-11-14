#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h237-h238-crossindex.md"), "utf8");
assert.match(doc, /H237/);
assert.match(doc, /H238/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h231-h232-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh18.md")));
console.log("OK H243 H237 ↔ H238 billing crossindex contract");

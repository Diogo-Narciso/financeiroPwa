#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h273-h274-crossindex.md"), "utf8");
assert.match(doc, /H273/);
assert.match(doc, /H274/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h267-h268-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh24.md")));
console.log("OK H279 H273 ↔ H274 billing crossindex contract");

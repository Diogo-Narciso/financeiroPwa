#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h267-h268-crossindex.md"), "utf8");
assert.match(doc, /H267/);
assert.match(doc, /H268/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h261-h262-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh23.md")));
console.log("OK H273 H267 ↔ H268 billing crossindex contract");

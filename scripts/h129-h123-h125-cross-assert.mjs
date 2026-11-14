#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h123-h125-crossindex.md"), "utf8");
assert.match(doc, /H123/);
assert.match(doc, /H125/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h117-h118-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h125-sub-post-plans-get-harness.md")));
console.log("OK H129 H123 ↔ H125 billing crossindex contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-cancel-plans-refresh12.md"), "utf8");
assert.match(doc, /H194/);
assert.match(doc, /H188/);
assert.match(doc, /POST/);
assert.match(doc, /GET/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh11.md")));
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh10.md")));
console.log("OK H200 cancel↔plans refresh #12 contract");

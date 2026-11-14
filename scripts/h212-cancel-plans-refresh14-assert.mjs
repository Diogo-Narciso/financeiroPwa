#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-cancel-plans-refresh14.md"), "utf8");
assert.match(doc, /H206/);
assert.match(doc, /H200/);
assert.match(doc, /POST/);
assert.match(doc, /GET/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh13.md")));
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh12.md")));
console.log("OK H212 cancel↔plans refresh #14 contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-cancel-plans-refresh29.md"), "utf8");
assert.match(doc, /H299/);
assert.match(doc, /H293/);
assert.match(doc, /GET|POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh28.md")));
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh27.md")));
console.log("OK H305 cancel↔plans refresh #29 contract");

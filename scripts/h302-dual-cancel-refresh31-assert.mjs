#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-dual-method-cancel-refresh31.md"), "utf8");
assert.match(doc, /H296/);
assert.match(doc, /H290/);
assert.match(doc, /GET/);
assert.match(doc, /POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-dual-method-cancel-refresh30.md")));
assert.ok(existsSync(join(root, "docs/billing-dual-method-cancel-refresh29.md")));
console.log("OK H302 dual-method cancel refresh #31 contract");

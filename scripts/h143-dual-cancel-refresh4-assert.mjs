#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-dual-method-cancel-refresh4.md"), "utf8");
assert.match(doc, /H138/);
assert.match(doc, /H132/);
assert.match(doc, /GET/);
assert.match(doc, /POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-dual-method-cancel-refresh3.md")));
assert.ok(existsSync(join(root, "docs/billing-dual-method-cancel-refresh2.md")));
console.log("OK H143 dual-method cancel refresh #4 contract");

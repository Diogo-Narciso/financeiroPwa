#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-dual-method-cancel-refresh37.md"), "utf8");
assert.match(doc, /H332/);
assert.match(doc, /H326/);
assert.match(doc, /GET/);
assert.match(doc, /POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-dual-method-cancel-refresh36.md")));
assert.ok(existsSync(join(root, "docs/billing-dual-method-cancel-refresh35.md")));
console.log("OK H338 dual-method cancel refresh #37 contract");

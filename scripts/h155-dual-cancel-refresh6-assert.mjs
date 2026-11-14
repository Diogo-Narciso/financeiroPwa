#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-dual-method-cancel-refresh6.md"), "utf8");
assert.match(doc, /H149/);
assert.match(doc, /H143/);
assert.match(doc, /GET/);
assert.match(doc, /POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-dual-method-cancel-refresh5.md")));
assert.ok(existsSync(join(root, "docs/billing-dual-method-cancel-refresh4.md")));
console.log("OK H155 dual-method cancel refresh #6 contract");

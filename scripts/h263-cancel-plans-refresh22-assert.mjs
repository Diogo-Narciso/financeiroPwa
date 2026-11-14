#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-cancel-plans-refresh22.md"), "utf8");
assert.match(doc, /H257/);
assert.match(doc, /H251/);
assert.match(doc, /GET|POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh21.md")));
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh20.md")));
console.log("OK H263 cancel↔plans refresh #22 contract");

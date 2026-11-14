#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-cancel-plans-refresh19.md"), "utf8");
assert.match(doc, /H239/);
assert.match(doc, /H233/);
assert.match(doc, /GET|POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh18.md")));
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh17.md")));
console.log("OK H245 cancel↔plans refresh #19 contract");

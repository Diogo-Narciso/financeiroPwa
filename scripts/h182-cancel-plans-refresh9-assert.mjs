#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-cancel-plans-refresh9.md"), "utf8");
assert.match(doc, /H176/);
assert.match(doc, /H170/);
assert.match(doc, /GET/);
assert.match(doc, /POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh8.md")));
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh7.md")));
console.log("OK H182 cancel POST vs plans GET refresh #9 contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-cancel-plans-refresh3.md"), "utf8");
assert.match(doc, /H135/);
assert.match(doc, /H124/);
assert.match(doc, /GET/);
assert.match(doc, /POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh2.md")));
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh-note.md")));
console.log("OK H146 cancel POST vs plans GET refresh #3 contract");

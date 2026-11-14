#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-cancel-plans-refresh34.md"), "utf8");
assert.match(doc, /H329/);
assert.match(doc, /H323/);
assert.match(doc, /GET/);
assert.match(doc, /POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh33.md")));
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh32.md")));
console.log("OK H335 cancel↔plans refresh #34 contract");

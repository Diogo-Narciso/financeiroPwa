#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-cancel-plans-refresh24.md"), "utf8");
assert.match(doc, /H269/);
assert.match(doc, /H263/);
assert.match(doc, /GET|POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh23.md")));
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh22.md")));
console.log("OK H275 cancel↔plans refresh #24 contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h212-h213-crossindex.md"), "utf8");
assert.match(doc, /H212/);
assert.match(doc, /H213/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-refresh14.md")));
assert.ok(existsSync(join(root, "docs/billing-h206-h207-crossindex.md")));
console.log("OK H219 H212 ↔ H213 billing crossindex contract");

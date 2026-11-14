#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h129-h128-crossindex.md"), "utf8");
assert.match(doc, /H129/);
assert.match(doc, /H128/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h123-h125-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h128-cancel-plans-refresh-harness.md")));
console.log("OK H134 H129 ↔ H128 billing crossindex contract");

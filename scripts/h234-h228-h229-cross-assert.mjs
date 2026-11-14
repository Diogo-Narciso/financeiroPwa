#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h228-h229-crossindex.md"), "utf8");
assert.match(doc, /H228/);
assert.match(doc, /H229/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h222-h223-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h224-dual-cancel-refresh18-harness.md")));
console.log("OK H234 H228 ↔ H229 billing crossindex contract");

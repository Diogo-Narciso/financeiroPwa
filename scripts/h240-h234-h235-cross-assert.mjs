#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h234-h235-crossindex.md"), "utf8");
assert.match(doc, /H234/);
assert.match(doc, /H235/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h228-h229-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h230-dual-cancel-refresh19-harness.md")));
console.log("OK H240 H234 ↔ H235 billing crossindex contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h288-h289-crossindex.md"), "utf8");
assert.match(doc, /H288/);
assert.match(doc, /H289/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h282-h283-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h284-dual-cancel-refresh28-harness.md")));
console.log("OK H294 H288 ↔ H289 billing crossindex contract");

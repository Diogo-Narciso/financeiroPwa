#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h336-h337-crossindex.md"), "utf8");
assert.match(doc, /H336/);
assert.match(doc, /H337/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h330-h331-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h332-dual-cancel-refresh36-harness.md")));
console.log("OK H342 H336 ↔ H337 billing crossindex contract");

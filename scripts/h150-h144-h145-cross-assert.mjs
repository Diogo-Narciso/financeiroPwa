#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h144-h145-crossindex.md"), "utf8");
assert.match(doc, /H144/);
assert.match(doc, /H145/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h139-h140-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h145-dual-cancel-refresh3-harness.md")));
console.log("OK H150 H144 ↔ H145 billing crossindex contract");

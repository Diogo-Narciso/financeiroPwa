#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h150-h151-crossindex.md"), "utf8");
assert.match(doc, /H150/);
assert.match(doc, /H151/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h144-h145-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h151-cancel-plans-refresh3-harness.md")));
console.log("OK H156 H150 ↔ H151 billing crossindex contract");

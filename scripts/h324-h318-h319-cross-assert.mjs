#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h318-h319-crossindex.md"), "utf8");
assert.match(doc, /H318/);
assert.match(doc, /H319/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h312-h313-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h314-dual-cancel-refresh33-harness.md")));
console.log("OK H324 H318 ↔ H319 billing crossindex contract");

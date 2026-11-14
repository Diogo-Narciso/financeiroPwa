#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h276-h277-crossindex.md"), "utf8");
assert.match(doc, /H276/);
assert.match(doc, /H277/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h270-h271-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h272-dual-cancel-refresh26-harness.md")));
console.log("OK H282 H276 ↔ H277 billing crossindex contract");

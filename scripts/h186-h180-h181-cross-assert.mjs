#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h180-h181-crossindex.md"), "utf8");
assert.match(doc, /H180/);
assert.match(doc, /H181/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h174-h175-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h181-cancel-plans-refresh8-harness.md")));
console.log("OK H186 H180 ↔ H181 billing crossindex contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h225-h226-crossindex.md"), "utf8");
assert.match(doc, /H225/);
assert.match(doc, /H226/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h219-h220-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh16.md")));
console.log("OK H231 H225 ↔ H226 billing crossindex contract");

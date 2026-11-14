#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h297-h298-crossindex.md"), "utf8");
assert.match(doc, /H297/);
assert.match(doc, /H298/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h291-h292-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh28.md")));
console.log("OK H303 H297 ↔ H298 billing crossindex contract");

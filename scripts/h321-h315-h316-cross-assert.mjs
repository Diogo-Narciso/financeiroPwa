#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h315-h316-crossindex.md"), "utf8");
assert.match(doc, /H315/);
assert.match(doc, /H316/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h309-h310-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh31.md")));
console.log("OK H321 H315 ↔ H316 billing crossindex contract");

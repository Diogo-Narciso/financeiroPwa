#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h321-h322-crossindex.md"), "utf8");
assert.match(doc, /H321/);
assert.match(doc, /H322/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h315-h316-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh32.md")));
console.log("OK H327 H321 ↔ H322 billing crossindex contract");

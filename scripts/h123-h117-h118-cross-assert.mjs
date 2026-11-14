#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h117-h118-crossindex.md"), "utf8");
assert.match(doc, /H117/);
assert.match(doc, /H118/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-mutations-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-dual-method-cancel-note.md")));
console.log("OK H123 H117 ↔ H118 billing crossindex contract");

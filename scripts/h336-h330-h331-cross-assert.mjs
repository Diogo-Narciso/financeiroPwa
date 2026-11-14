#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h330-h331-crossindex.md"), "utf8");
assert.match(doc, /H330/);
assert.match(doc, /H331/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h324-h325-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h326-dual-cancel-refresh35-harness.md")));
console.log("OK H336 H330 ↔ H331 billing crossindex contract");

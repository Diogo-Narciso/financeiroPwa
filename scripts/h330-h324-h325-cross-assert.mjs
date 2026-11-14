#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h324-h325-crossindex.md"), "utf8");
assert.match(doc, /H324/);
assert.match(doc, /H325/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h318-h319-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h320-dual-cancel-refresh34-harness.md")));
console.log("OK H330 H324 ↔ H325 billing crossindex contract");

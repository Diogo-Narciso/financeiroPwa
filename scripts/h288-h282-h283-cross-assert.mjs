#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h282-h283-crossindex.md"), "utf8");
assert.match(doc, /H282/);
assert.match(doc, /H283/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h276-h277-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h278-dual-cancel-refresh27-harness.md")));
console.log("OK H288 H282 ↔ H283 billing crossindex contract");

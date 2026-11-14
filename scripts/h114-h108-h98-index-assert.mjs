#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h108-h98-dual-harness-index.md"), "utf8");
assert.match(doc, /H108/);
assert.match(doc, /H98/);
assert.match(doc, /H89/);
assert.ok(existsSync(join(root, "docs/dual-glossary-h89-index.md")));
assert.ok(existsSync(join(root, "docs/h98-dual-method-harness.md")));
console.log("OK H114 H108 ↔ H98 dual harness index contract");

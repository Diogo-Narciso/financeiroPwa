#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h114-h103-glossary-index.md"), "utf8");
assert.match(doc, /H114/);
assert.match(doc, /H103/);
assert.ok(existsSync(join(root, "docs/h108-h98-dual-harness-index.md")));
assert.ok(existsSync(join(root, "docs/dual-method-proposal-glossary-cross.md")));
console.log("OK H120 H114 ↔ H103 glossary index contract");

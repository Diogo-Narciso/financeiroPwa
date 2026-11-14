#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h126-h120-dual-chain-index.md"), "utf8");
assert.match(doc, /H126/);
assert.match(doc, /H120/);
assert.match(doc, /H89/);
assert.ok(existsSync(join(root, "docs/h120-h108-dual-chain-index.md")));
assert.ok(existsSync(join(root, "docs/h114-h103-glossary-index.md")));
console.log("OK H131 H126 ↔ H120 dual chain index contract");

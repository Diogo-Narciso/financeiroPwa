#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h137-h131-dual-chain-index.md"), "utf8");
assert.match(doc, /H137/);
assert.match(doc, /H131/);
assert.match(doc, /H89/);
assert.ok(existsSync(join(root, "docs/h131-h126-dual-chain-index.md")));
assert.ok(existsSync(join(root, "docs/h126-h120-dual-chain-index.md")));
console.log("OK H142 H137 ↔ H131 dual chain index contract");

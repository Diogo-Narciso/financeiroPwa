#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h165-h159-dual-chain-index.md"), "utf8");
assert.match(doc, /H165/);
assert.match(doc, /H159/);
assert.match(doc, /H89/);
assert.ok(existsSync(join(root, "docs/h159-h153-dual-chain-index.md")));
assert.ok(existsSync(join(root, "docs/h153-h147-dual-chain-index.md")));
console.log("OK H171 H165 ↔ H159 dual chain index contract");

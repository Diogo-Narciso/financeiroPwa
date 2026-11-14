#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h177-h171-dual-chain-index.md"), "utf8");
assert.match(doc, /H177/);
assert.match(doc, /H171/);
assert.match(doc, /H89/);
assert.ok(existsSync(join(root, "docs/h171-h165-dual-chain-index.md")));
assert.ok(existsSync(join(root, "docs/h165-h159-dual-chain-index.md")));
console.log("OK H183 H177 ↔ H171 dual chain index contract");

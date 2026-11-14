#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h189-h183-dual-chain-index.md"), "utf8");
assert.match(doc, /H189/);
assert.match(doc, /H183/);
assert.match(doc, /H89/);
assert.ok(existsSync(join(root, "docs/h183-h177-dual-chain-index.md")));
assert.ok(existsSync(join(root, "docs/h177-h171-dual-chain-index.md")));
console.log("OK H195 H189 ↔ H183 dual chain index contract");

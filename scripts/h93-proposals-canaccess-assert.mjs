#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/proposals-canaccess-crossindex.md"), "utf8");
assert.match(doc, /H87/);
assert.match(doc, /H73/);
assert.match(doc, /canAccess|role proposal/i);
assert.match(doc, /E-R01|G-R01/);
assert.match(doc, /não.*wire|Proibições/i);
assert.ok(existsSync(join(root, "docs/role-proposal-helpers-glossary.md")));
assert.ok(existsSync(join(root, "docs/canaccess-helpers-glossary.md")));
console.log("OK H93 proposals ↔ canAccess crossindex contract");

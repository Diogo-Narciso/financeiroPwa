#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h95-glossary-assert-coverage.md"), "utf8");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const tu = pkg.scripts["test:unit"];
assert.match(doc, /H73/);
assert.match(doc, /H87/);
assert.match(doc, /test:unit/);
assert.match(tu, /h73-canaccess-glossary-assert\.mjs/);
assert.match(tu, /h87-role-proposal-glossary-assert\.mjs/);
console.log("OK H95 glossary assert coverage contract");

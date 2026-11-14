#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/rule-status-glossary.md"), "utf8");
assert.match(doc, /draft/);
assert.match(doc, /in_review/);
assert.match(doc, /homologated/);
assert.match(doc, /suspended/);
assert.match(doc, /ended/);
assert.match(doc, /não.*promov|Proibido|Gate H9|nunca `homologated`/i);
console.log("OK H30 rule status glossary contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/roles-acoes-sensiveis.md"), "utf8");
assert.match(doc, /owner/);
assert.match(doc, /admin/);
assert.match(doc, /analyst/);
assert.match(doc, /reviewer/);
assert.match(doc, /homolog|H17|tenant/i);
assert.match(doc, /não.*homologated|Proibido|G-R/i);
console.log("OK H37 roles x acoes sensiveis contract");

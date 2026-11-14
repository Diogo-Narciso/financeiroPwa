#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/erp-ensaio-evidencias.md"), "utf8");
assert.match(doc, /export-erp-inventory|H20/);
assert.match(doc, /não.*certif|ensaio ≠ certificação|≠ certificação/i);
assert.match(doc, /SHA-256/);
assert.match(doc, /H22/);
console.log("OK H21 ERP ensaio evidencias contract");

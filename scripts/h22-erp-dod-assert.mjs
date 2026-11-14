#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/erp-certificacao-dod.md"), "utf8");
assert.match(doc, /H21/);
assert.match(doc, /P06/);
assert.match(doc, /aberto|gap/i);
assert.match(doc, /não.*marca P06|P06 ainda aberto|não deve/i);
console.log("OK H22 ERP certification DoD contract");

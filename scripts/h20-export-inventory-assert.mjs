#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/export-erp-inventory.md"), "utf8");
assert.match(doc, /originais/);
assert.match(doc, /mapeamento_cfop/);
assert.match(doc, /erp\/README/);
assert.match(doc, /não.*certif|Nenhum ERP|não.*homolog/i);
assert.match(doc, /P06|H21|H22/);
console.log("OK H20 export-erp inventory contract");

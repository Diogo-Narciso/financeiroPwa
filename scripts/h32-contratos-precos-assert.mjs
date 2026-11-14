#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/contratos-precos-mapa.md"), "utf8");
assert.match(doc, /P07/);
assert.match(doc, /P08/);
assert.match(doc, /pre[cç]o|price/i);
assert.match(doc, /contrato|contract/i);
assert.match(doc, /não.*invent|Proibido|não publica/i);
console.log("OK H32 contratos precos mapa contract");

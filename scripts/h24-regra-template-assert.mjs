#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/regra-homologada-template.md"), "utf8");
assert.match(doc, /ruleId|Identificador/);
assert.match(doc, /modality|Modalidade/);
assert.match(doc, /homologated/);
assert.match(doc, /draft/);
assert.match(doc, /não.*homolog|Proibido|alíquot/i);
console.log("OK H24 regra homologada template contract");

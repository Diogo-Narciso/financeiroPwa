#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/convenio-52-91-evidencias.md"), "utf8");

assert.match(doc, /Convênio ICMS 52\/91|Convênio 52\/91|52\/1991/);
assert.match(doc, /F04/);
assert.match(doc, /F02/);
assert.match(doc, /F08/);
assert.match(doc, /F09/);
assert.match(doc, /não.*cadastrar|Proibido/i);
assert.match(doc, /131\/2026|2027\/2028/);
assert.match(doc, /homologated/);
assert.doesNotMatch(doc, /alíquota oficial homologada\s*=\s*\d/);

console.log("OK H15 convenio evidence pack contract");

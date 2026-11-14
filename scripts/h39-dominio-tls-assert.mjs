#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/dominio-tls-evidencias.md"), "utf8");
assert.match(doc, /P13|D01/);
assert.match(doc, /TLS|tls|cert/i);
assert.match(doc, /health|H38/i);
assert.match(doc, /aberto|não.*fecha|Proibido|chave privada/i);
console.log("OK H39 dominio TLS evidencias contract");

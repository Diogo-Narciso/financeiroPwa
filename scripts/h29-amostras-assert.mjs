#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/protocolo-amostras-xml.md"), "utf8");
assert.match(doc, /Dual calc|dual calc/i);
assert.match(doc, /H16|fixtures/);
assert.match(doc, /PII|anonimiz/i);
assert.match(doc, /homologated/);
assert.match(doc, /SHA-256|hash/i);
assert.doesNotMatch(doc, /usar XML de produção sem anonimizar/i);
console.log("OK H29 amostras XML protocol contract");

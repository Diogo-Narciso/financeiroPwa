#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/tls-renovacao-checklist.md"), "utf8");
assert.match(doc, /TLS|tls|renova/i);
assert.match(doc, /H39|H38|P13/);
assert.match(doc, /T-R0/);
assert.match(doc, /chave privada|Proibido|não.*fecha|aberto/i);
console.log("OK H44 TLS renovacao checklist contract");

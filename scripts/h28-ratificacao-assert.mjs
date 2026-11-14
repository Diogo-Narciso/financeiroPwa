#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/ratificacao-131-26-checklist.md"), "utf8");
assert.match(doc, /131\/2026|131\/26|F09/);
assert.match(doc, /ratifica/i);
assert.match(doc, /2027|2028/);
assert.match(doc, /não.*ativa|Proibido.*ativar|activationAllowed/i);
assert.match(doc, /false/i);
console.log("OK H28 ratificacao 131/26 checklist contract");

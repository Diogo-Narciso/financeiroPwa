#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/primeira-fatia-melhorias.md"), "utf8");
assert.match(doc, /Top 5|H1/);
assert.match(doc, /H9|H12|H13/);
assert.match(doc, /0.*homologated|homologated/);
assert.match(doc, /go-live|bloqueado|lancamento/i);
assert.match(doc, /não.*invent|Proibido|sem inventar/i);
console.log("OK H5 primeira fatia plan contract");

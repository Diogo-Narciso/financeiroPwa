#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/arit-vs-planilha.md"), "utf8");
assert.match(doc, /ARIT-A/);
assert.match(doc, /ARIT-B/);
assert.match(doc, /ARIT-C/);
assert.match(doc, /P02/);
assert.match(doc, /homologated/);
assert.match(doc, /Proibições|não.*promov/i);
console.log("OK H26 arit vs planilha contract");

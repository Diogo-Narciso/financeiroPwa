#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/matriz-pendencias-fiscais.md"), "utf8");
for (const id of ["P01", "P02", "P03", "P04", "P05", "P14", "H25", "H29"]) {
  assert.match(doc, new RegExp(id));
}
assert.match(doc, /não.*fecha|Fora/i);
console.log("OK H23 matriz pendencias contract");

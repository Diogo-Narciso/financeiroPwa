#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/fiscal-gaps.md"), "utf8");

for (const id of ["P01", "P02", "P03", "P04", "P05", "P14", "homologated"]) {
  assert.match(doc, new RegExp(id));
}
assert.match(doc, /não.*inventa|Proibições/i);
assert.match(doc, /H23|H15|H14/);
assert.doesNotMatch(doc, /alíquota homologada\s*=\s*0[,.]?\d+/i);

console.log("OK H4 fiscal-gaps inventory contract");

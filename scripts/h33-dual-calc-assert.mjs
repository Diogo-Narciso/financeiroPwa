#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/dual-calc-harness-seed.md"), "utf8");
assert.match(doc, /H29|dual calc/i);
assert.match(doc, /H16|fixture/i);
assert.match(doc, /layerA|layerB/);
assert.match(doc, /fiscalApproved/);
assert.match(doc, /false/);
assert.match(doc, /não.*homolog|Proibido|homologated/i);
console.log("OK H33 dual-calc harness seed contract");

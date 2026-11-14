#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/avisos-ux-beneficio-52-91.md"), "utf8");
assert.match(doc, /52\/91/);
assert.match(doc, /UX-52-/);
assert.match(doc, /zero|DIFAL/i);
assert.match(doc, /131\/26|FECP|homolog/i);
assert.match(doc, /Proibido|não.*cadastr|não.*benefício confirmado/i);
console.log("OK H35 avisos UX 52/91 contract");

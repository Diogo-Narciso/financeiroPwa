#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/ops-support-runbook.md"), "utf8");
assert.match(doc, /P13|H31/);
assert.match(doc, /suporte|supportContact|incidente/i);
assert.match(doc, /não.*fecha P13|não marca|Proibido/i);
assert.match(doc, /alíquota|fiscal|pendente/i);
console.log("OK H36 support runbook contract");

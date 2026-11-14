#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/healthcheck-externo-smoke.md"), "utf8");
assert.match(doc, /\/api\/health/);
assert.match(doc, /H31|M01|P13/);
assert.match(doc, /curl|smoke/i);
assert.match(doc, /não.*fecha|Proibido|secrets|segredo/i);
console.log("OK H38 healthcheck externo smoke contract");

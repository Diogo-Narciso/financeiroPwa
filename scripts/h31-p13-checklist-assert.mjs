#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/ops-golive-p13-checklist.md"), "utf8");
assert.match(doc, /P13/);
assert.match(doc, /dom[ií]nio|productionDomain/i);
assert.match(doc, /monitoramento|uptimeMonitoring|health/i);
assert.match(doc, /suporte|supportContact/i);
assert.match(doc, /aberto|não.*aprov|não marca P13/i);
console.log("OK H31 P13 ops go-live checklist contract");

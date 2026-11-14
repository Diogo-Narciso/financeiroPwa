#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/audit-events-retencao.md"), "utf8");
assert.match(doc, /audit_events/);
assert.match(doc, /H11|12 meses|12/);
assert.match(doc, /purgeJobExists/);
assert.match(doc, /false/);
assert.match(doc, /Proibido|não.*fecha|silencios/i);
console.log("OK H46 audit events retencao contract");

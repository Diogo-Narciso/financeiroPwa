#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/dpa-psp-checklist.md"), "utf8");
assert.match(doc, /DPA|P10|P11/);
assert.match(doc, /H34|G-P11-07|H12/);
assert.match(doc, /liveBillingAllowed/);
assert.match(doc, /false/);
assert.match(doc, /não.*fecha|Proibido|não assina/i);
console.log("OK H40 DPA PSP checklist contract");

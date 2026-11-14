#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/er01-auth-endpoints-glossary.md"), "utf8");
assert.match(doc, /E-R01/);
assert.match(doc, /AUTH/);
assert.match(doc, /invoices|quotas|billing/);
assert.match(doc, /não.*fecha E-R01|Proibições/i);
console.log("OK H81 E-R01 AUTH endpoints glossary contract");

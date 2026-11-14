#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/canaccess-helpers-glossary.md"), "utf8");

assert.match(doc, /canAccessTaxRun/);
assert.match(doc, /canAccessExportDownload/);
assert.match(doc, /matchesCompanyGetRoleProposal|role proposal/i);
assert.match(doc, /G-R01/);
assert.match(doc, /não.*altera ACL|Proibições/i);
console.log("OK H73 canAccess helpers glossary contract");

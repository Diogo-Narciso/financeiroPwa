#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/role-gate-helpers-index.md"), "utf8");
assert.match(doc, /canAccessTaxRun/);
assert.match(doc, /canAccessExportDownload/);
assert.match(doc, /company-get-role-proposal|matchesCompanyGetRoleProposal/);
assert.match(doc, /não.*wired|não wired|Proibido|G-R01/i);
console.log("OK H70 role-gate helpers index contract");

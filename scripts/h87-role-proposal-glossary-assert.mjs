#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/role-proposal-helpers-glossary.md"), "utf8");
assert.match(doc, /role proposal/i);
assert.match(doc, /matchesCompanyGetRoleProposal|matchesBillingPlansRoleProposal/);
assert.match(doc, /E-R01/);
assert.match(doc, /não.*wire|Proibições/i);
console.log("OK H87 role proposal helpers glossary contract");

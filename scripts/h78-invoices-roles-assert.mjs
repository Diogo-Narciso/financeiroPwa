#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/invoices-list-roles-spec.md"), "utf8");
const route = readFileSync(join(root, "apps/web/src/app/api/invoices/route.ts"), "utf8");

assert.match(doc, /invoices/i);
assert.match(doc, /GET/);
assert.match(doc, /AUTH|requireUser/i);
assert.match(doc, /owner.*admin.*analyst.*reviewer|proposta/i);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.match(route, /requireUser/);
assert.doesNotMatch(route, /canAccess|ROLE_PROPOSAL|allowedRoles/);
console.log("OK H78 invoices list roles spec contract");

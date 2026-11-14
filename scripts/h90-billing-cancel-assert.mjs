#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-cancel-roles-spec.md"), "utf8");
const route = readFileSync(join(root, "apps/web/src/app/api/billing/cancel/route.ts"), "utf8");
assert.match(doc, /billing\/cancel/);
assert.match(doc, /AUTH|requireUser/i);
assert.match(doc, /owner.*admin|proposta/i);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.match(route, /requireUser/);
assert.doesNotMatch(route, /canAccess|ROLE_PROPOSAL|allowedRoles/);
console.log("OK H90 billing/cancel roles spec contract");

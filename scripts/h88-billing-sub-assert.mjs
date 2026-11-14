#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-subscription-roles-spec.md"), "utf8");
const route = readFileSync(
  join(root, "apps/web/src/app/api/billing/subscription/route.ts"),
  "utf8",
);
assert.match(doc, /billing\/subscription/);
assert.match(doc, /AUTH|requireUser/i);
assert.match(doc, /owner.*admin|proposta/i);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.match(route, /requireUser/);
assert.doesNotMatch(route, /canAccess|ROLE_PROPOSAL|allowedRoles/);
console.log("OK H88 billing/subscription roles spec contract");

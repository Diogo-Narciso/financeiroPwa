#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-auth-gaps-index.md"), "utf8");
const plans = readFileSync(join(root, "apps/web/src/app/api/billing/plans/route.ts"), "utf8");
const sub = readFileSync(join(root, "apps/web/src/app/api/billing/subscription/route.ts"), "utf8");
const cancel = readFileSync(join(root, "apps/web/src/app/api/billing/cancel/route.ts"), "utf8");
const hook = readFileSync(join(root, "apps/web/src/app/api/billing/webhook/mock/route.ts"), "utf8");

assert.match(doc, /E-R01/);
assert.match(doc, /billing\/plans|billing\/subscription|billing\/cancel/);
assert.match(doc, /não.*altera ACL|Proibições/i);
assert.match(plans, /requireUser/);
assert.match(sub, /requireUser/);
assert.match(cancel, /requireUser/);
assert.doesNotMatch(hook, /requireUser/);
console.log("OK H76 billing AUTH gaps index contract");

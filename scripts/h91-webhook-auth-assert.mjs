#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-webhook-auth-index.md"), "utf8");
const hook = readFileSync(
  join(root, "apps/web/src/app/api/billing/webhook/mock/route.ts"),
  "utf8",
);
const plans = readFileSync(
  join(root, "apps/web/src/app/api/billing/plans/route.ts"),
  "utf8",
);
assert.match(doc, /E-B01|webhook\/mock/);
assert.match(doc, /H76|E-R01/);
assert.match(doc, /não.*altera ACL|Proibições/i);
assert.doesNotMatch(hook, /requireUser/);
assert.match(plans, /requireUser/);
console.log("OK H91 billing webhook vs AUTH index contract");

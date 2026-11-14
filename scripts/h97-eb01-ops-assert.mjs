#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/eb01-ops-notes.md"), "utf8");
const index = readFileSync(
  join(root, "docs/billing-webhook-auth-index.md"),
  "utf8",
);
const hook = readFileSync(
  join(root, "apps/web/src/app/api/billing/webhook/mock/route.ts"),
  "utf8",
);
assert.match(doc, /E-B01/);
assert.match(doc, /H91/);
assert.match(doc, /webhook\/mock/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.match(doc, /eB01Closed[\s\S]*false/i);
assert.match(index, /E-B01/);
assert.doesNotMatch(hook, /requireUser/);
console.log("OK H97 E-B01 ops notes contract");

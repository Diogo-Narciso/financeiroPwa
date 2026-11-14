#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(
  join(root, "docs/billing-cancel-subscription-roles-align.md"),
  "utf8",
);
const cancel = readFileSync(join(root, "docs/billing-cancel-roles-spec.md"), "utf8");
const sub = readFileSync(
  join(root, "docs/billing-subscription-roles-spec.md"),
  "utf8",
);
assert.match(doc, /H88/);
assert.match(doc, /H90/);
assert.match(doc, /owner.*admin/i);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.match(cancel, /billing\/cancel/);
assert.match(sub, /billing\/subscription/);
console.log("OK H96 cancel ↔ subscription roles align contract");

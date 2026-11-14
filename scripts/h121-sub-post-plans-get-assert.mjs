#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(
  join(root, "docs/billing-subscription-post-plans-get-align.md"),
  "utf8",
);
assert.match(doc, /H84/);
assert.match(doc, /H88/);
assert.match(doc, /GET/);
assert.match(doc, /POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
console.log("OK H121 subscription POST ↔ plans GET align contract");

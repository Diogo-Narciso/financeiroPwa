#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(
  join(root, "docs/billing-cancel-plans-method-note.md"),
  "utf8",
);
assert.match(doc, /H100/);
assert.match(doc, /GET/);
assert.match(doc, /POST/);
assert.match(doc, /owner.*admin/i);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
console.log("OK H109 cancel POST vs plans GET note contract");

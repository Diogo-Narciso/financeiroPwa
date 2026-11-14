#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-roles-align-crossindex.md"), "utf8");
assert.match(doc, /H96/);
assert.match(doc, /H100/);
assert.match(doc, /owner.*admin/i);
assert.match(doc, /não.*altera ACL|Proibições/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-subscription-roles-align.md")));
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-roles-align.md")));
console.log("OK H105 H96 ↔ H100 billing roles crossindex contract");

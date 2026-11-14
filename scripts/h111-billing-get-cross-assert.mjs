#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-get-align-crossindex.md"), "utf8");
assert.match(doc, /H105/);
assert.match(doc, /H106/);
assert.match(doc, /owner.*admin/i);
assert.match(doc, /não.*altera ACL|Proibições/i);
assert.ok(existsSync(join(root, "docs/billing-roles-align-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-plans-subscription-get-align.md")));
console.log("OK H111 H105 ↔ H106 billing GET crossindex contract");

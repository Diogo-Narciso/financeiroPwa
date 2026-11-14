#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-invoices-quotas-crossindex.md"), "utf8");
assert.match(doc, /H76/);
assert.match(doc, /H67/);
assert.match(doc, /E-R01/);
assert.match(doc, /billing|invoices|quotas/);
assert.match(doc, /não.*altera ACL|Proibições/i);
assert.ok(existsSync(join(root, "docs/billing-auth-gaps-index.md")));
assert.ok(existsSync(join(root, "docs/invoices-quotas-auth-index.md")));
console.log("OK H85 billing ↔ invoices/quotas crossindex contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/invoices-quotas-auth-index.md"), "utf8");
const invoices = readFileSync(
  join(root, "apps/web/src/app/api/invoices/route.ts"),
  "utf8",
);
assert.match(doc, /E-R01/);
assert.match(doc, /invoices|quotas/);
assert.match(doc, /AUTH/);
assert.match(doc, /não.*altera ACL|Proibido|Não editar/i);
assert.match(invoices, /requireUser/);
assert.doesNotMatch(invoices, /\["owner".*"admin"/);
console.log("OK H67 invoices/quotas AUTH index contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/companies-auth-index.md"), "utf8");
const route = readFileSync(
  join(root, "apps/web/src/app/api/companies/[id]/route.ts"),
  "utf8",
);
assert.match(doc, /E-R01/);
assert.match(doc, /companies\/\[id\]/);
assert.match(doc, /AUTH/);
assert.match(doc, /não.*altera ACL|Proibido|não fecha/i);
assert.match(route, /requireUser/);
assert.doesNotMatch(route, /\["owner".*"admin"/);
console.log("OK H55 companies/[id] AUTH index contract");

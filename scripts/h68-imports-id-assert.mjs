#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/imports-id-roles-spec.md"), "utf8");
const route = readFileSync(
  join(root, "apps/web/src/app/api/imports/[id]/route.ts"),
  "utf8",
);
assert.match(doc, /imports\/\[id\]/);
assert.match(doc, /AUTH|aclChangedInThisPR/);
assert.match(doc, /false/);
assert.match(doc, /Não editar|Proibido|não.*altera/i);
assert.match(route, /requireUser/);
assert.doesNotMatch(route, /\["owner".*"admin"/);
console.log("OK H68 imports/[id] roles spec contract");

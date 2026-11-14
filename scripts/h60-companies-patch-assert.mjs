#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/companies-patch-roles-spec.md"), "utf8");
assert.match(doc, /H55|E-R01/);
assert.match(doc, /PATCH|companies\/\[id\]/);
assert.match(doc, /aclChangedInThisPR/);
assert.match(doc, /false/);
assert.match(doc, /não.*altera ACL|Proibido|Não editar/i);
console.log("OK H60 companies PATCH roles spec contract");

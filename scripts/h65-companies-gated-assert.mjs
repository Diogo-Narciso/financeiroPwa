#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/companies-patch-apply-gated.md"), "utf8");
assert.match(doc, /H60|gated|bloqueado/i);
assert.match(doc, /G-01/);
assert.match(doc, /aclChangedInThisPR/);
assert.match(doc, /false/);
assert.match(doc, /Não editar|Proibido|companies\/\[id\]/i);
console.log("OK H65 companies PATCH apply gated contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/endpoints-role-inventory.md"), "utf8");
assert.match(doc, /ROLE/);
assert.match(doc, /AUTH/);
assert.match(doc, /OPEN/);
assert.match(doc, /G-R01|H37|H42/);
assert.match(doc, /E-R0/);
assert.match(doc, /não.*ACL|Proibido|homologated/i);
console.log("OK H43 endpoints role inventory contract");

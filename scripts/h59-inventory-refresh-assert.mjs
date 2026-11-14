#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/endpoints-role-inventory.md"), "utf8");
assert.match(doc, /ROLE|AUTH|OPEN/);
assert.match(doc, /E-R02/);
assert.match(doc, /E-R03/);
assert.match(doc, /tratado|H48|H49/);
assert.match(doc, /H53|H54|tax-runs\/\[id\]|exports\/\[id\]\/download/);
assert.match(doc, /não.*altera ACL|Proibido/i);
console.log("OK H59 endpoints inventory refresh contract");

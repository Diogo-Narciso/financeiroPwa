#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/matriz-gaps-roles.md"), "utf8");
assert.match(doc, /G-R01/);
assert.match(doc, /G-R02/);
assert.match(doc, /G-R03/);
assert.match(doc, /G-R04/);
assert.match(doc, /H37|H17|H43/);
assert.match(doc, /não.*ACL|Proibido|homologated/i);
console.log("OK H42 matriz gaps roles contract");

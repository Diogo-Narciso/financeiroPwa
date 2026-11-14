#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/ADR-002-owner-vs-admin.md"), "utf8");
assert.match(doc, /owner/);
assert.match(doc, /admin/);
assert.match(doc, /G-R02|H37/);
assert.match(doc, /ADR-002|Decisão/);
assert.match(doc, /não.*ACL|Proibido|homologated/i);
console.log("OK H47 ADR owner vs admin contract");

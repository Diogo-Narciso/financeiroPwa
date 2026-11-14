#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/webhook-billing-auth-crossindex.md"), "utf8");
assert.match(doc, /H76/);
assert.match(doc, /H91/);
assert.match(doc, /E-B01/);
assert.match(doc, /E-R01/);
assert.match(doc, /não.*altera ACL|Proibições/i);
assert.ok(existsSync(join(root, "docs/billing-webhook-auth-index.md")));
assert.ok(existsSync(join(root, "docs/billing-auth-gaps-index.md")));
assert.ok(existsSync(join(root, "docs/eb01-ops-notes.md")));
console.log("OK H99 webhook ↔ billing AUTH crossindex contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(
  join(root, "docs/dual-method-proposal-glossary-cross.md"),
  "utf8",
);
assert.match(doc, /H94|H98/);
assert.match(doc, /H87/);
assert.match(doc, /role proposal/i);
assert.match(doc, /não.*wire|Proibições/i);
assert.ok(existsSync(join(root, "docs/role-proposal-helpers-glossary.md")));
assert.ok(existsSync(join(root, "docs/h98-dual-method-harness.md")));
assert.ok(existsSync(join(root, "docs/billing-subscription-dual-method-note.md")));
console.log("OK H103 dual-method ↔ proposal glossary contract");

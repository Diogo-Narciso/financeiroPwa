#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/eb01-psp-gaps-crosslink.md"), "utf8");
assert.match(doc, /E-B01/);
assert.match(doc, /H97|H34/);
assert.match(doc, /G-P11|psp/i);
assert.match(doc, /não.*fecha|Proibições/i);
assert.ok(existsSync(join(root, "docs/eb01-ops-notes.md")));
assert.ok(existsSync(join(root, "docs/psp-live-gaps.md")));
console.log("OK H102 E-B01 ↔ PSP gaps crosslink contract");

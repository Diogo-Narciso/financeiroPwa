#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/psp-live-gaps.md"), "utf8");
assert.match(doc, /P11|H12/);
assert.match(doc, /mock_sandbox|MockSandbox/);
assert.match(doc, /G-P11-/);
assert.match(doc, /aberto|não.*fecha|Proibido/i);
assert.match(doc, /chave|segredo|token|git/i);
console.log("OK H34 PSP live gaps contract");

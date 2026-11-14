#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/webhooks-billing-index.md"), "utf8");
assert.match(doc, /webhook/i);
assert.match(doc, /mock|billing_events/i);
assert.match(doc, /G-WH-/);
assert.match(doc, /H12|H34|P11/);
assert.match(doc, /Proibido|não.*fecha|assinatura/i);
console.log("OK H41 webhooks billing index contract");

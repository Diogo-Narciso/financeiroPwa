#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/legalhold-evidence-crosslink.md"), "utf8");
assert.match(doc, /H63/);
assert.match(doc, /H69/);
assert.match(doc, /legalHoldTicketUri|L-03/);
assert.match(doc, /blocks_purge|purgeJobExists/);
assert.match(doc, /não.*DELETE|Proibições/i);
console.log("OK H75 legal-hold ↔ evidence crosslink contract");

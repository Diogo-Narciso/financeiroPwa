#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/legal-hold-purge-ticket.md"), "utf8");
assert.match(doc, /H51|H56|legal hold|hold/i);
assert.match(doc, /tenant_id/);
assert.match(doc, /blocks_purge/);
assert.match(doc, /true/);
assert.match(doc, /DELETE|Proibido|não.*purge/i);
console.log("OK H63 legal hold purge ticket contract");

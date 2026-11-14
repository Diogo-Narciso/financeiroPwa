#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-cancel-plans-refresh-note.md"), "utf8");
assert.match(doc, /H109/);
assert.match(doc, /H115/);
assert.match(doc, /GET/);
assert.match(doc, /POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-cancel-plans-method-note.md")));
assert.ok(existsSync(join(root, "docs/billing-plans-get-cancel-cross.md")));
console.log("OK H124 cancel POST vs plans GET refresh contract");

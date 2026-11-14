#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-dual-method-cancel-refresh.md"), "utf8");
assert.match(doc, /H118/);
assert.match(doc, /H94/);
assert.match(doc, /GET/);
assert.match(doc, /POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-dual-method-cancel-note.md")));
assert.ok(existsSync(join(root, "docs/billing-subscription-dual-method-note.md")));
console.log("OK H127 dual-method cancel refresh contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-dual-method-cancel-note.md"), "utf8");
assert.match(doc, /H94/);
assert.match(doc, /H112/);
assert.match(doc, /GET|POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-subscription-dual-method-note.md")));
assert.ok(existsSync(join(root, "docs/billing-subscription-post-cancel-align.md")));
console.log("OK H118 dual-method vs cancel note contract");

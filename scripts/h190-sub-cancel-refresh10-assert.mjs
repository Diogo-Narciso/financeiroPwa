#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-sub-post-cancel-refresh10.md"), "utf8");
assert.match(doc, /H184/);
assert.match(doc, /H178/);
assert.match(doc, /POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh9.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh8.md")));
console.log("OK H190 subscription POST vs cancel refresh #10 contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-sub-post-cancel-refresh20.md"), "utf8");
assert.match(doc, /H244/);
assert.match(doc, /H238/);
assert.match(doc, /POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh19.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh18.md")));
console.log("OK H250 subscription POST vs cancel refresh #20 contract");

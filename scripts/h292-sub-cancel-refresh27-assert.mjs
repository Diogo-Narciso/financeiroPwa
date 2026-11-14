#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-sub-post-cancel-refresh27.md"), "utf8");
assert.match(doc, /H286/);
assert.match(doc, /H280/);
assert.match(doc, /POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh26.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh25.md")));
console.log("OK H292 subscription POST vs cancel refresh #27 contract");

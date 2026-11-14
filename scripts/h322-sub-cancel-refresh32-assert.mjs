#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-sub-post-cancel-refresh32.md"), "utf8");
assert.match(doc, /H316/);
assert.match(doc, /H310/);
assert.match(doc, /POST/);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh31.md")));
assert.ok(existsSync(join(root, "docs/billing-sub-post-cancel-refresh30.md")));
console.log("OK H322 subscription POST vs cancel refresh #32 contract");

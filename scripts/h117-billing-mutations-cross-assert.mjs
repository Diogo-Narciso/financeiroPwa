#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-mutations-crossindex.md"), "utf8");
assert.match(doc, /H111/);
assert.match(doc, /H112/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-get-align-crossindex.md")));
assert.ok(existsSync(join(root, "docs/billing-subscription-post-cancel-align.md")));
console.log("OK H117 H111 ↔ H112 billing mutations crossindex contract");

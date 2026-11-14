#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/billing-h264-h265-crossindex.md"), "utf8");
assert.match(doc, /H264/);
assert.match(doc, /H265/);
assert.match(doc, /owner.*admin/i);
assert.ok(existsSync(join(root, "docs/billing-h258-h259-crossindex.md")));
assert.ok(existsSync(join(root, "docs/h260-dual-cancel-refresh24-harness.md")));
console.log("OK H270 H264 ↔ H265 billing crossindex contract");

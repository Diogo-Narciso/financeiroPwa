#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(
  join(root, "docs/h107-eb01-psp-crosslink-harness.md"),
  "utf8",
);
const hook = readFileSync(
  join(root, "apps/web/src/app/api/billing/webhook/mock/route.ts"),
  "utf8",
);
assert.match(doc, /H102/);
assert.match(doc, /H97/);
assert.match(doc, /H34/);
assert.ok(existsSync(join(root, "docs/eb01-psp-gaps-crosslink.md")));
assert.ok(existsSync(join(root, "docs/eb01-ops-notes.md")));
assert.ok(existsSync(join(root, "docs/psp-live-gaps.md")));
assert.doesNotMatch(hook, /requireUser/);
console.log("OK H107 E-B01 ↔ PSP crosslink harness contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(
  join(root, "docs/audit-events-purge-staging-evidence.md"),
  "utf8",
);
assert.match(doc, /H56|staging|dry-run/i);
assert.match(doc, /E-S01|E-S06/);
assert.match(doc, /purgeJobExists/);
assert.match(doc, /false/);
assert.match(doc, /DELETE|Proibido|não.*purge/i);
console.log("OK H61 purge staging evidence pack contract");

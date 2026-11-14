#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(
  join(root, "docs/audit-events-purge-evidence-links.md"),
  "utf8",
);
assert.match(doc, /H61|L-01|L-06/);
assert.match(doc, /purgeJobExists/);
assert.match(doc, /false/);
assert.match(doc, /FQDN|DELETE|Proibido|não.*purge/i);
console.log("OK H69 dry-run evidence link fields contract");

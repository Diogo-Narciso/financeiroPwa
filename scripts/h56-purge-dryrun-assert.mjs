#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/audit-events-purge-dryrun.md"), "utf8");
assert.match(doc, /H51|dry-run|dry run/i);
assert.match(doc, /D-01|D-06/);
assert.match(doc, /purgeJobExists/);
assert.match(doc, /false/);
assert.match(doc, /DELETE|não.*purge|Proibido/i);
console.log("OK H56 audit_events purge dry-run checklist contract");

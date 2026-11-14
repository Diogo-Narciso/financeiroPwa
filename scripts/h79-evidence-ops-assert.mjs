#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/evidence-ops-fill-checklist.md"), "utf8");
assert.match(doc, /H69/);
assert.match(doc, /H75|legalHoldTicketUri|L-03/);
assert.match(doc, /L-01|L-06|purgeJobExists/);
assert.match(doc, /FQDN|não.*DELETE|Proibições/i);
console.log("OK H79 evidence ops fill checklist contract");

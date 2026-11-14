#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/audit-events-purge-job-spec.md"), "utf8");
assert.match(doc, /H46|H11/);
assert.match(doc, /audit_events_purge|audit_events/);
assert.match(doc, /purgeJobExists/);
assert.match(doc, /false/);
assert.match(doc, /dualControl|dual control/i);
assert.match(doc, /não.*implementa|Proibido|não apagar/i);
assert.match(doc, /12/);
console.log("OK H51 audit_events purge job spec contract");

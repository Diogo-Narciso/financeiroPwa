#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/export-titular-ticket-template.md"), "utf8");
assert.match(doc, /H52|titular/);
assert.match(doc, /tenant_id/);
assert.match(doc, /exportTitularEndpointExists|self-service|Não criar/i);
assert.match(doc, /não.*fecha P10|Proibido/i);
console.log("OK H57 export titular ticket template contract");

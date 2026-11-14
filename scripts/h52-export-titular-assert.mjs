#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/export-titular-spec.md"), "utf8");
assert.match(doc, /H11|titular/);
assert.match(doc, /exportTitularEndpointExists/);
assert.match(doc, /false/);
assert.match(doc, /tenant/);
assert.match(doc, /self-service|selfService/i);
assert.match(doc, /não.*implementa|Proibido|Não criar/i);
console.log("OK H52 export titular spec contract");

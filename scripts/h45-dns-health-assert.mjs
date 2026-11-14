#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/dns-health-smoke.md"), "utf8");
assert.match(doc, /DNS|dns/i);
assert.match(doc, /\/api\/health/);
assert.match(doc, /H39|H38/);
assert.match(doc, /DOMAIN|openssl|curl/);
assert.match(doc, /não.*FQDN|Proibido|aberto|não.*fecha/i);
console.log("OK H45 DNS health smoke contract");

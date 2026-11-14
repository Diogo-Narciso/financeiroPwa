#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/tls-post-renew-smoke.md"), "utf8");
assert.match(doc, /T-R06|H44/);
assert.match(doc, /H45|health|\/api\/health/);
assert.match(doc, /postRenewHealthOk|openssl|curl/);
assert.match(doc, /Proibido|não.*FQDN|aberto|não.*fecha/i);
console.log("OK H50 TLS post-renew smoke contract");

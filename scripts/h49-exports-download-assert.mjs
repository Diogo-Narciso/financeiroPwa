#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h49-exports-download-role.md"), "utf8");
const route = readFileSync(
  join(root, "apps/web/src/app/api/exports/[id]/download/route.ts"),
  "utf8",
);
assert.match(doc, /E-R03/);
const literal = /\["owner", "admin", "reviewer", "analyst"\]/;
if (!literal.test(route)) {
  assert.match(route, /canAccessExportDownload/);
  const gate = readFileSync(
    join(root, "apps/web/src/server/export-download-role-gate.ts"),
    "utf8",
  );
  assert.match(gate, /EXPORT_DOWNLOAD_ROLES/);
  assert.match(gate, /"owner"/);
  assert.match(gate, /"admin"/);
  assert.match(gate, /"reviewer"/);
  assert.match(gate, /"analyst"/);
}
assert.match(route, /403/);
console.log("OK H49 exports download role align contract");

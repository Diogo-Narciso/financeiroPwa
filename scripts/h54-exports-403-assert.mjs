#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h54-exports-403-unit.md"), "utf8");
const gate = readFileSync(
  join(root, "apps/web/src/server/export-download-role-gate.ts"),
  "utf8",
);
const test = readFileSync(
  join(root, "apps/web/src/server/export-download-role-gate.test.ts"),
  "utf8",
);
const route = readFileSync(
  join(root, "apps/web/src/app/api/exports/[id]/download/route.ts"),
  "utf8",
);
const webPkg = readFileSync(join(root, "apps/web/package.json"), "utf8");

assert.match(doc, /H49|E-R03/);
assert.match(doc, /403/);
assert.match(gate, /canAccessExportDownload/);
assert.match(gate, /EXPORT_DOWNLOAD_ROLES/);
assert.match(test, /canAccessExportDownload/);
assert.match(test, /viewer|false/);
assert.match(route, /canAccessExportDownload/);
assert.match(webPkg, /export-download-role-gate\.test\.ts/);
console.log("OK H54 exports download 403 unit contract");

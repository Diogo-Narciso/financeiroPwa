#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/h62-exports-post-helper.md"), "utf8");
const route = readFileSync(
  join(root, "apps/web/src/app/api/exports/route.ts"),
  "utf8",
);
assert.match(doc, /H54|canAccessExportDownload/);
assert.match(route, /canAccessExportDownload/);
assert.match(route, /403/);
console.log("OK H62 exports POST helper contract");

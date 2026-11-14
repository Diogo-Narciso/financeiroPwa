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
assert.match(route, /\["owner", "admin", "reviewer", "analyst"\]/);
assert.match(route, /403/);
console.log("OK H49 exports download role align contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(
  join(root, "docs/billing-subscription-dual-method-note.md"),
  "utf8",
);
const route = readFileSync(
  join(root, "apps/web/src/app/api/billing/subscription/route.ts"),
  "utf8",
);
assert.match(doc, /H88/);
assert.match(doc, /GET/);
assert.match(doc, /POST/);
assert.match(doc, /owner.*admin|proposta/i);
assert.match(doc, /aclChangedInThisPR[\s\S]*false/i);
assert.match(route, /export async function GET/);
assert.match(route, /export async function POST/);
assert.match(route, /requireUser/);
console.log("OK H94 billing/subscription dual-method note contract");

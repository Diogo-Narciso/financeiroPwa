#!/usr/bin/env node
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "scripts/fixtures/nfe");
const files = readdirSync(dir).filter((f) => f.endsWith(".xml"));
assert.ok(files.length >= 1, "expected nfe fixtures");

const cpf = /\d{3}\.\d{3}\.\d{3}-\d{2}/;
const email = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

for (const f of files) {
  const xml = readFileSync(join(dir, f), "utf8");
  assert.equal(cpf.test(xml), false, `${f} must not contain CPF mask`);
  assert.equal(email.test(xml), false, `${f} must not contain email`);
  assert.match(xml, /DEMO|demo|teste|Teste|SKU/, `${f} should look synthetic`);
}

const doc = readFileSync(join(root, "docs/fixtures-sem-pii.md"), "utf8");
assert.match(doc, /PII|sintéticos/);

console.log("OK H16 fixtures without real PII", { files: files.length });

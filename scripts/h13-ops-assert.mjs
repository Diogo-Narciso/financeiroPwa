#!/usr/bin/env node
/**
 * H13 CT: docs + drill script contract (no live Postgres required in CI).
 */
import assert from "node:assert/strict";
import { readFileSync, accessSync, constants } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const script = join(root, "scripts/e7-backup-restore-drill.sh");
const doc = join(root, "docs/ops-backup-restore.md");
const checklist = join(root, "docs/lancamento-checklist.md");

accessSync(script, constants.R_OK);
accessSync(doc, constants.R_OK);

const sh = readFileSync(script, "utf8");
assert.match(sh, /--restore-check/);
assert.match(sh, /last-drill\.json/);
assert.match(sh, /productionManagedBackup/);
assert.match(sh, /pg_dump/);

const md = readFileSync(doc, "utf8");
assert.match(md, /RPO/);
assert.match(md, /RTO/);
assert.match(md, /e7-backup-restore-drill/);

const cl = readFileSync(checklist, "utf8");
assert.match(cl, /ops-backup-restore\.md/);

console.log("OK H13 ops backup/restore docs + script contract");

#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const doc = readFileSync(join(root, "docs/atos-st-referencias.md"), "utf8");
assert.match(doc, /F03|Substituição Tributária/);
assert.match(doc, /P03/);
assert.match(doc, /proibido|não.*aplica/i);
console.log("OK H27 atos ST referencias contract");

import assert from "node:assert/strict";
import { DEMO_CASES } from "./arithmetic-demo";
import { TAX_MODULES } from "./modules";
import { RULE_PUBLICATION_STATUS } from "./rule-status";
import { buildRuleInventory, summarizeRuleInventory } from "./rule-inventory";

const rows = buildRuleInventory();
const summary = summarizeRuleInventory(rows);

assert.equal(
  rows.filter((r) => r.kind === "demo_case").length,
  Object.keys(DEMO_CASES).length,
);
assert.equal(
  rows.filter((r) => r.kind === "module").length,
  Object.values(TAX_MODULES).length,
);

assert.ok((summary.byStatus[RULE_PUBLICATION_STATUS.demo] ?? 0) >= 3);
assert.ok((summary.byStatus[RULE_PUBLICATION_STATUS.pending_homologation] ?? 0) >= 1);
assert.equal(summary.homologatedCount, 0);
assert.equal(summary.anyProductionCalculation, false);

for (const r of rows) {
  assert.notEqual(r.publicationStatus, RULE_PUBLICATION_STATUS.homologated);
  if (r.kind === "demo_case") {
    assert.equal(r.publicationStatus, RULE_PUBLICATION_STATUS.demo);
    assert.equal(r.productionCalculation, false);
  }
}

console.log("OK H14 rule-inventory", summary);

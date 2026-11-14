import assert from "node:assert/strict";
import { DEMO_CASES } from "./arithmetic-demo";
import { evaluateItemTax } from "./evaluate";
import { TAX_MODULES } from "./modules";
import {
  RULE_PUBLICATION_STATUS,
  isDemoOnlyStatus,
  isHomologatedStatus,
} from "./rule-status";

const { expected: _expected, ...demoInput } = DEMO_CASES["ARIT-A"];

// Demo path → ruleStatus demo, never homologated
const demo = evaluateItemTax({
  module: TAX_MODULES.acquisitionContributor,
  hasHomologatedRule: true, // even if caller lies
  demoArithmetic: demoInput,
});
assert.equal(demo.outcome, "demo_arithmetic_only");
assert.equal(demo.ruleStatus, RULE_PUBLICATION_STATUS.demo);
assert.equal(isDemoOnlyStatus(demo.ruleStatus), true);
assert.equal(isHomologatedStatus(demo.ruleStatus), false);
assert.ok(demo.message.toLowerCase().includes("não é regra fiscal homologada"));

// Pending without demo → pending_homologation, null amounts
const pending = evaluateItemTax({
  module: TAX_MODULES.acquisitionContributor,
  hasHomologatedRule: false,
  destinationUf: "RJ",
  purpose: "consumo",
});
assert.equal(pending.outcome, "pending_validation");
assert.equal(pending.ruleStatus, RULE_PUBLICATION_STATUS.pending_homologation);
assert.equal(pending.icmsDifal, null);
assert.equal(isHomologatedStatus(pending.ruleStatus), false);

// Flag true but path unpublished → still pending, not homologated
const flagged = evaluateItemTax({
  module: TAX_MODULES.acquisitionContributor,
  hasHomologatedRule: true,
});
assert.equal(flagged.ruleStatus, RULE_PUBLICATION_STATUS.pending_homologation);
assert.equal(isHomologatedStatus(flagged.ruleStatus), false);

// Disabled module
const disabled = evaluateItemTax({
  module: TAX_MODULES.saleNonContributor,
  hasHomologatedRule: false,
});
assert.equal(disabled.ruleStatus, RULE_PUBLICATION_STATUS.disabled);

console.log("OK H9 rule-status gate (demo ≠ homologated)");

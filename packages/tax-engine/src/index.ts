export { Decimal, d, roundMoney } from "./decimal";
export { TAX_MODULES, MODULE_STATUS } from "./modules";
export {
  RULE_PUBLICATION_STATUS,
  isDemoOnlyStatus,
  isHomologatedStatus,
  type RulePublicationStatus,
} from "./rule-status";
export {
  assertDemoCase,
  computeIllustrativeGrossUpDifal,
  DEMO_CASES,
  type IllustrativeInputs,
  type IllustrativeResult,
} from "./arithmetic-demo";
export { evaluateItemTax, type TaxEvalInput, type TaxEvalResult } from "./evaluate";
export {
  buildRuleInventory,
  summarizeRuleInventory,
  type InventoryRow,
} from "./rule-inventory";

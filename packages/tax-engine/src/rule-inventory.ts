import { DEMO_CASES } from "./arithmetic-demo";
import { MODULE_STATUS, TAX_MODULES } from "./modules";
import {
  RULE_PUBLICATION_STATUS,
  type RulePublicationStatus,
} from "./rule-status";

export type InventoryRow = {
  id: string;
  kind: "module" | "demo_case";
  publicationStatus: RulePublicationStatus;
  productionCalculation: boolean;
  note: string;
};

/** Machine-readable inventory: demo fixtures vs pending/disabled modules (H14). */
export function buildRuleInventory(): InventoryRow[] {
  const modules: InventoryRow[] = Object.values(TAX_MODULES).map((mod) => {
    const st = MODULE_STATUS[mod];
    return {
      id: mod,
      kind: "module",
      publicationStatus: st.publicationStatus,
      productionCalculation: st.productionCalculation,
      note: st.note,
    };
  });

  const demos: InventoryRow[] = (Object.keys(DEMO_CASES) as (keyof typeof DEMO_CASES)[]).map(
    (id) => ({
      id,
      kind: "demo_case" as const,
      publicationStatus: RULE_PUBLICATION_STATUS.demo,
      productionCalculation: false,
      note: "CASOS_ARITMETICOS — ilustrativo; nunca homologated.",
    }),
  );

  return [...modules, ...demos];
}

export function summarizeRuleInventory(rows: InventoryRow[] = buildRuleInventory()) {
  const byStatus: Record<string, number> = {};
  for (const r of rows) {
    byStatus[r.publicationStatus] = (byStatus[r.publicationStatus] ?? 0) + 1;
  }
  const homologatedCount = rows.filter(
    (r) => r.publicationStatus === RULE_PUBLICATION_STATUS.homologated,
  ).length;
  return {
    total: rows.length,
    byStatus,
    homologatedCount,
    anyProductionCalculation: rows.some((r) => r.productionCalculation),
  };
}

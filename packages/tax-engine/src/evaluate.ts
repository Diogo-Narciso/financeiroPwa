import { MODULE_STATUS, TAX_MODULES } from "./modules";
import {
  computeIllustrativeGrossUpDifal,
  type IllustrativeInputs,
} from "./arithmetic-demo";
import {
  RULE_PUBLICATION_STATUS,
  type RulePublicationStatus,
} from "./rule-status";

export type TaxEvalInput = {
  module: string;
  hasHomologatedRule: boolean;
  destinationUf?: string | null;
  purpose?: string | null;
  /** Only for explicit demo runs — never auto-applied as fiscal law. */
  demoArithmetic?: IllustrativeInputs | null;
  benefitCandidate?: boolean;
};

export type TaxEvalResult = {
  outcome:
    | "pending_validation"
    | "fora_do_escopo_homologado"
    | "demo_arithmetic_only"
    | "module_disabled";
  /** Explicit gate: demo ≠ homologated (H9). */
  ruleStatus: RulePublicationStatus;
  message: string;
  pendingFields: string[];
  icmsDifal: string | null;
  fecp: string | null;
  total: string | null;
  base: string | null;
  steps: { label: string; expression: string; value: string }[];
  scenarios: {
    code: "A_sem_beneficio" | "B_com_beneficio_condicionado";
    label: string;
    note: string;
  }[];
};

/**
 * Production path: missing homologated rule => pendency, never silent R$ 0 as non-incidence.
 */
export function evaluateItemTax(input: TaxEvalInput): TaxEvalResult {
  if (input.module === TAX_MODULES.saleNonContributor) {
    return {
      outcome: "module_disabled",
      ruleStatus: RULE_PUBLICATION_STATUS.disabled,
      message: MODULE_STATUS[TAX_MODULES.saleNonContributor].note,
      pendingFields: ["module_disabled"],
      icmsDifal: null,
      fecp: null,
      total: null,
      base: null,
      steps: [],
      scenarios: [],
    };
  }

  if (input.module !== TAX_MODULES.acquisitionContributor) {
    return {
      outcome: "fora_do_escopo_homologado",
      ruleStatus: RULE_PUBLICATION_STATUS.out_of_scope,
      message: "Módulo fiscal desconhecido ou fora do escopo.",
      pendingFields: ["module"],
      icmsDifal: null,
      fecp: null,
      total: null,
      base: null,
      steps: [],
      scenarios: [],
    };
  }

  const scenarios = [
    {
      code: "A_sem_beneficio" as const,
      label: "Cenário A — sem benefício",
      note: "Referência sem benefício. Não somar A+B.",
    },
    {
      code: "B_com_beneficio_condicionado" as const,
      label: "Cenário B — benefício condicionado",
      note: "Scaffold Convênio 52/91. Auto-aplicação desativada até homologação.",
    },
  ];

  // Demo path is explicit and never upgrades to homologated, even if
  // hasHomologatedRule is true (caller mistake must not launder demo numbers).
  if (input.demoArithmetic) {
    const demo = computeIllustrativeGrossUpDifal(input.demoArithmetic);
    return {
      outcome: "demo_arithmetic_only",
      ruleStatus: RULE_PUBLICATION_STATUS.demo,
      message:
        "Resultado aritmético demonstrativo (CASOS_ARITMETICOS). Não é regra fiscal homologada.",
      pendingFields: ["homologacao_fiscal"],
      icmsDifal: demo.icmsDifferentialRounded,
      fecp: demo.fecpRounded,
      total: demo.sumOfRoundedComponents,
      base: demo.base,
      steps: demo.steps,
      scenarios,
    };
  }

  if (!input.hasHomologatedRule) {
    const pending = [
      "tax_rule_version_homologated",
      "aliquota_interestadual",
      "aliquota_interna_destino",
      "politica_arredondamento",
    ];
    if (!input.destinationUf) pending.push("destination_uf");
    if (!input.purpose || input.purpose === "indeterminado") {
      pending.push("finalidade_confirmada");
    }
    return {
      outcome: "pending_validation",
      ruleStatus: RULE_PUBLICATION_STATUS.pending_homologation,
      message:
        "Sem regra homologada para a operação/competência. Pendente de validação — não exibir R$ 0,00 como não incidência.",
      pendingFields: pending,
      icmsDifal: null,
      fecp: null,
      total: null,
      base: null,
      steps: [],
      scenarios: input.benefitCandidate ? scenarios : scenarios.slice(0, 1),
    };
  }

  // Homologated path not implemented until rules are approved — still pending.
  return {
    outcome: "pending_validation",
    ruleStatus: RULE_PUBLICATION_STATUS.pending_homologation,
    message: "Caminho homologado ainda não publicado para produção.",
    pendingFields: ["implementation_homologated_path"],
    icmsDifal: null,
    fecp: null,
    total: null,
    base: null,
    steps: [],
    scenarios,
  };
}

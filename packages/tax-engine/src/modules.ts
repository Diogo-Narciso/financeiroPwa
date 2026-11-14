import {
  RULE_PUBLICATION_STATUS,
  type RulePublicationStatus,
} from "./rule-status";

export const TAX_MODULES = {
  acquisitionContributor:
    "difal_aquisicao_consumidor_final_contribuinte" as const,
  saleNonContributor:
    "difal_venda_consumidor_final_nao_contribuinte" as const,
};

export const MODULE_STATUS: Record<
  (typeof TAX_MODULES)[keyof typeof TAX_MODULES],
  {
    mvpEnabledStructure: boolean;
    productionCalculation: boolean;
    publicationStatus: RulePublicationStatus;
    note: string;
  }
> = {
  [TAX_MODULES.acquisitionContributor]: {
    mvpEnabledStructure: true,
    productionCalculation: false,
    publicationStatus: RULE_PUBLICATION_STATUS.pending_homologation,
    note: "Estrutura ativa; cálculo de produção exige regra homologada.",
  },
  [TAX_MODULES.saleNonContributor]: {
    mvpEnabledStructure: false,
    productionCalculation: false,
    publicationStatus: RULE_PUBLICATION_STATUS.disabled,
    note: "Módulo distinto e desabilitado no MVP.",
  },
};

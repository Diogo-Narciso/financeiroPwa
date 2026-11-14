export const TAX_MODULES = {
  acquisitionContributor:
    "difal_aquisicao_consumidor_final_contribuinte" as const,
  saleNonContributor:
    "difal_venda_consumidor_final_nao_contribuinte" as const,
};

export const MODULE_STATUS = {
  [TAX_MODULES.acquisitionContributor]: {
    mvpEnabledStructure: true,
    productionCalculation: false,
    note: "Estrutura ativa; cálculo de produção exige regra homologada.",
  },
  [TAX_MODULES.saleNonContributor]: {
    mvpEnabledStructure: false,
    productionCalculation: false,
    note: "Módulo distinto e desabilitado no MVP.",
  },
} as const;

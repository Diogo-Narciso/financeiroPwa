# Glossário — helpers `canAccess*` / role proposal (H73)

**Status:** glossário de helpers · **não** altera ACL · **não** fecha G-R01  
**Fontes:** H70 índice · `apps/web/src/server/*-role-gate.ts` · `*-role-proposal.ts`

## Termos

| Termo | Significado | Arquivo |
|---|---|---|
| `canAccessTaxRun` | Gate de leitura/escrita tax-runs por role | `tax-run-role-gate.ts` |
| `canAccessExportDownload` | Gate download/POST exports por role | `export-download-role-gate.ts` |
| `matchesCompanyGetRoleProposal` | Harness proposta GET companies (não wired) | `company-get-role-proposal.ts` |
| `role gate` | Helper que decide 403 vs allow sem inventar matriz central | H53/H54/H58/H62 |
| `role proposal` | Const + matcher de draft roles; route permanece AUTH | H66 harness |
| `G-R01` | Gap matriz roles global — **aberto** | inventário H42/H43 |
| `E-R01` | Gap endpoints AUTH sem roles — **aberto** | inventário H43 |

## Proibições

- Não unificar helpers inventando matriz central neste PR.
- Não fechar G-R01 / E-R01.
- Não alterar routes.

## CTs

- CT-gl-01: cita canAccessTaxRun / canAccessExportDownload  
- CT-gl-02: cita role proposal / G-R01 aberto  
- CT-gl-03: assert CI

# Índice — helpers de role gate (H70)

**Status:** inventário de helpers · **não** altera ACL · **não** fecha G-R01  
**Fontes:** H53/H54/H58/H62 · `apps/web/src/server/*-role-gate.ts`

## Helpers

| Helper | Arquivo | Usado em |
|---|---|---|
| `canAccessTaxRun` | `tax-run-role-gate.ts` | GET/POST `tax-runs` (H53/H58) |
| `canAccessExportDownload` | `export-download-role-gate.ts` | GET/POST `exports` (H54/H62) |
| `matchesCompanyGetRoleProposal` | `company-get-role-proposal.ts` | **não** wired (H66 harness) |

## Proibições

- Não unificar helpers inventando matriz central neste PR.
- Não fechar G-R01.
- Não aplicar proposal companies GET.

## CTs

- CT-rg-01: cita canAccessTaxRun / canAccessExportDownload  
- CT-rg-02: company GET proposal não wired  
- CT-rg-03: assert CI

# Glossário — helpers `*-role-proposal` (H87)

**Status:** glossário · **não** altera ACL · **não** fecha E-R01 / G-R01  
**Fontes:** H66/H72/H77/H80/H83/H86 harnesses · `apps/web/src/server/*-role-proposal.ts`

## Termos

| Termo | Significado |
|---|---|
| `role proposal` | Const + matcher de draft roles; **não** wired na route |
| `matches*RoleProposal` | Retorna true só para roles da const draft |
| `AUTH AS-IS` | Route continua só com `requireUser` |
| `E-R01` | Gap endpoints AUTH sem roles — aberto |

## Helpers (amostra)

| Helper | Arquivo | Spec |
|---|---|---|
| `matchesCompanyGetRoleProposal` | `company-get-role-proposal.ts` | H66 |
| `matchesImportsIdRoleProposal` | `imports-id-role-proposal.ts` | H72 |
| `matchesQuotasReserveRoleProposal` | `quotas-reserve-role-proposal.ts` | H77 |
| `matchesQuotasGetRoleProposal` | `quotas-get-role-proposal.ts` | H80 |
| `matchesInvoicesListRoleProposal` | `invoices-list-role-proposal.ts` | H83 |
| `matchesBillingPlansRoleProposal` | `billing-plans-role-proposal.ts` | H86 |

## Proibições

- Não unificar/wire helpers nas routes neste PR.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-rp-01: cita role proposal / matches* / H66|H86  
- CT-rp-02: proíbe wire/fechar E-R01  
- CT-rp-03: assert CI

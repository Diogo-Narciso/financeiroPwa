# Índice — dual-glossary ↔ H89 subscription proposal (H108 / H103 · H89)

**Status:** índice pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/dual-method-proposal-glossary-cross.md` (H103) · `apps/web/src/server/billing-subscription-role-proposal.ts` (H89)

## Ligação

| Peça | Nota |
|---|---|
| H103 | dual-method ↔ glossário H87 |
| H89 | `matchesBillingSubscriptionRoleProposal` |
| H98 | harness dual GET/POST reusa H89 |

## Achado

H103 aponta para o glossário; este índice fecha o loop até o helper H89 concreto (sem wire).

## Proibições

- Não importar helper na route.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-dg89-01: cita H103 / H89 / matchesBillingSubscriptionRoleProposal  
- CT-dg89-02: proíbe wire  
- CT-dg89-03: assert CI

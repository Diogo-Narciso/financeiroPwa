# Cross — dual-method subscription ↔ role-proposal glossary (H103 / H98 · H87)

**Status:** índice cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/h98-dual-method-harness.md` (H98) · `docs/billing-subscription-dual-method-note.md` (H94) · `docs/role-proposal-helpers-glossary.md` (H87)

## Ligação

| Peça | Papel |
|---|---|
| H94 dual-method note | GET+POST → mesma proposta owner\|admin |
| H89 / H98 | `matchesBillingSubscriptionRoleProposal` cobre ambos |
| H87 glossary | termo `role proposal` / AUTH AS-IS |

## Achado

Dual-method **não** exige helper novo — reutiliza proposal H89 listada no glossário H87 (amostra billing).  
Route permanece AUTH AS-IS.

## Proibições

- Não wire helpers nas routes.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-dg-01: cita H94 / H98 / H87 / role proposal  
- CT-dg-02: proíbe wire / fechar E-R01  
- CT-dg-03: assert CI

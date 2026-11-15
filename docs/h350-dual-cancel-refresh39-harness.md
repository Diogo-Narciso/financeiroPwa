# Harness — dual GET/POST subscription vs cancel refresh #39 (H355 / H350 · H94 · H90)

**Status:** harness de cobertura da nota refresh H350 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh39.md` (H350) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H350 refresh | subscription GET\|POST e cancel POST → owner \| admin |
| H94 proposal | `matchesBillingSubscriptionRoleProposal` |
| H90 proposal | `matchesBillingCancelRoleProposal` |
| Routes | proposals **não** wired (AS-IS) |

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh355-01: cita H350 / H94 / H90  
- CT-hh355-02: refresh dual GET\|POST  
- CT-hh355-03: proposals presentes; routes sem wire  
- CT-hh355-04: assert CI

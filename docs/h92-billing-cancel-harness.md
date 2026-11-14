# Harness — proposta roles POST `billing/cancel` (H92 / H90)

**Status:** unit harness da proposta · **não** altera ACL · **não** fecha E-R01  
**Código:** `apps/web/src/server/billing-cancel-role-proposal.ts` (+ `.test.ts`)  
**Nota:** route POST permanece AUTH (H90 AS-IS).

## Proposta testada

owner | admin → true; analyst/reviewer/demais → false

## Proibições

- Não importar o helper na route neste PR.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u92-01: doc cita H90 / proposal  
- CT-u92-02: web test:unit inclui harness; route sem matchesBillingCancelRoleProposal  
- CT-u92-03: assert CI

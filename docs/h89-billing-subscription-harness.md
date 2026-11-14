# Harness — proposta roles `billing/subscription` (H89 / H88)

**Status:** unit harness da proposta · **não** altera ACL · **não** fecha E-R01  
**Código:** `apps/web/src/server/billing-subscription-role-proposal.ts` (+ `.test.ts`)  
**Nota:** route GET|POST permanece AUTH (H88 AS-IS).

## Proposta testada

owner | admin → true; analyst/reviewer/demais → false

## Proibições

- Não importar o helper na route neste PR.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u89-01: doc cita H88 / proposal  
- CT-u89-02: web test:unit inclui harness; route sem matchesBillingSubscriptionRoleProposal  
- CT-u89-03: assert CI

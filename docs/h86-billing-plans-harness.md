# Harness — proposta roles GET `billing/plans` (H86 / H84)

**Status:** unit harness da proposta · **não** altera ACL · **não** fecha E-R01  
**Código:** `apps/web/src/server/billing-plans-role-proposal.ts` (+ `.test.ts`)  
**Nota:** route GET permanece AUTH (H84 AS-IS).

## Proposta testada

owner | admin → true; analyst/reviewer/demais → false

## Proibições

- Não importar o helper na route neste PR.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u86-01: doc cita H84 / proposal  
- CT-u86-02: web test:unit inclui harness; route sem matchesBillingPlansRoleProposal  
- CT-u86-03: assert CI

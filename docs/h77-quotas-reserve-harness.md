# Harness — proposta roles POST `quotas/.../reserve` (H77 / H71)

**Status:** unit harness da proposta · **não** altera ACL · **não** fecha E-R01  
**Código:** `apps/web/src/server/quotas-reserve-role-proposal.ts` (+ `.test.ts`)  
**Nota:** route POST permanece AUTH (H71 AS-IS).

## Proposta testada

owner | admin | analyst → true; reviewer/demais → false

## Proibições

- Não importar o helper na route neste PR.
- Não fechar E-R01/G-R01.

## CTs

- CT-u77-01: doc cita H71 / proposal  
- CT-u77-02: web test:unit inclui harness; route sem matchesQuotasReserveRoleProposal  
- CT-u77-03: assert CI

# Harness — proposta roles GET `/api/quotas` (H80 / H74)

**Status:** unit harness da proposta · **não** altera ACL · **não** fecha E-R01  
**Código:** `apps/web/src/server/quotas-get-role-proposal.ts` (+ `.test.ts`)  
**Nota:** route GET permanece AUTH (H74 AS-IS).

## Proposta testada

owner | admin | analyst | reviewer → true; demais → false

## Proibições

- Não importar o helper na route neste PR.
- Não fechar E-R01/G-R01.

## CTs

- CT-u80-01: doc cita H74 / proposal  
- CT-u80-02: web test:unit inclui harness; route GET sem matchesQuotasGetRoleProposal  
- CT-u80-03: assert CI

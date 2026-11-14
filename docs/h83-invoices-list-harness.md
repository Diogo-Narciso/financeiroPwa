# Harness — proposta roles GET `/api/invoices` (H83 / H78)

**Status:** unit harness da proposta · **não** altera ACL · **não** fecha E-R01  
**Código:** `apps/web/src/server/invoices-list-role-proposal.ts` (+ `.test.ts`)  
**Nota:** route GET permanece AUTH (H78 AS-IS).

## Proposta testada

owner | admin | analyst | reviewer → true; demais → false

## Proibições

- Não importar o helper na route neste PR.
- Não fechar E-R01/G-R01.

## CTs

- CT-u83-01: doc cita H78 / proposal  
- CT-u83-02: web test:unit inclui harness; route GET sem matchesInvoicesListRoleProposal  
- CT-u83-03: assert CI

# Harness — proposta roles GET `imports/[id]` (H72 / H68)

**Status:** unit harness da proposta · **não** altera ACL · **não** fecha E-R01  
**Código:** `apps/web/src/server/imports-id-role-proposal.ts` (+ `.test.ts`)  
**Nota:** route GET permanece AUTH (H68 AS-IS); aplicação de roles fora deste cartão.

## Proposta testada

owner | admin | analyst | reviewer → true; demais → false

## Proibições

- Não importar o helper na route neste PR.
- Não fechar E-R01/G-R01.

## CTs

- CT-u72-01: doc cita H68 / proposal  
- CT-u72-02: web test:unit inclui harness; route GET sem matchesImportsIdRoleProposal  
- CT-u72-03: assert CI

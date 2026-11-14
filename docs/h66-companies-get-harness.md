# Harness — proposta roles GET `companies/[id]` (H66 / H60)

**Status:** unit harness da proposta · **não** altera ACL · **não** fecha E-R01  
**Código:** `apps/web/src/server/company-get-role-proposal.ts` (+ `.test.ts`)  
**Nota:** route GET permanece AUTH (H55); aplicação gated em H65.

## Proposta testada

owner | admin | analyst | reviewer → true; demais → false

## Proibições

- Não importar o helper na route neste PR.
- Não fechar E-R01/G-R01.

## CTs

- CT-u66-01: doc cita H60 / H65 / proposal  
- CT-u66-02: web test:unit inclui harness; route GET sem matchesCompanyGetRoleProposal  
- CT-u66-03: assert CI

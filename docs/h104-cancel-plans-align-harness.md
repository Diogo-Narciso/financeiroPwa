# Harness — cancel ↔ plans roles align (H104 / H100 · H92 · H86)

**Status:** harness de cobertura do align H100 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-roles-align.md` (H100) · proposals H92 / H86

## Cobertura

| Item | Esperado |
|---|---|
| H100 align | cancel e plans → owner \| admin |
| H86 proposal | plans GET |
| H92 proposal | cancel POST |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes neste PR.
- Não inventar owner-only / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-u104-01: doc cita H100 / H86 / H92  
- CT-u104-02: proposals existem; routes sem matches*RoleProposal  
- CT-u104-03: assert CI

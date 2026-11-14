# Harness — cancel ↔ subscription roles align (H101 / H96 · H92 · H89)

**Status:** harness de cobertura do align H96 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-subscription-roles-align.md` (H96) · proposals H89 / H92

## Cobertura

| Item | Esperado |
|---|---|
| H96 align | cancel e subscription → owner \| admin |
| H89 proposal | subscription GET\|POST |
| H92 proposal | cancel POST |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes neste PR.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u101-01: doc cita H96 / H89 / H92  
- CT-u101-02: proposals existem; routes sem matches*RoleProposal  
- CT-u101-03: assert CI

# Harness — subscription POST ↔ cancel POST refresh (H136 / H130 · H89 · H92)

**Status:** harness de cobertura da nota refresh H130 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh.md` (H130) · proposals H89 / H92

## Cobertura

| Item | Esperado |
|---|---|
| H130 refresh | subscription POST e cancel POST → owner \| admin |
| H89 / H92 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u136-01: doc cita H130 / H89 / H92  
- CT-u136-02: proposals existem; routes sem matches*  
- CT-u136-03: assert CI

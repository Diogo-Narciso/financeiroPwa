# Harness — dual-method cancel refresh (H133 / H127 · H89 · H92)

**Status:** harness de cobertura da nota refresh H127 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh.md` (H127) · proposals H89 / H92

## Cobertura

| Item | Esperado |
|---|---|
| H127 refresh | subscription GET\|POST e cancel POST → owner \| admin |
| H89 / H92 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u133-01: doc cita H127 / H89 / H92  
- CT-u133-02: proposals existem; routes sem matches*  
- CT-u133-03: assert CI

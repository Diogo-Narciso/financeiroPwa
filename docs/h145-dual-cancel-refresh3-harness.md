# Harness — dual-method cancel refresh #3 (H145 / H138 · H89 · H92)

**Status:** harness de cobertura da nota refresh H138 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh3.md` (H138) · proposals H89 / H92

## Cobertura

| Item | Esperado |
|---|---|
| H138 refresh | subscription GET\|POST e cancel POST → owner \| admin |
| H89 / H92 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u145-01: doc cita H138 / H89 / H92  
- CT-u145-02: proposals existem; routes sem matches*  
- CT-u145-03: assert CI

# Harness — subscription POST ↔ plans GET (H125 / H121 · H89 · H86)

**Status:** harness de cobertura do align H121 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-subscription-post-plans-get-align.md` (H121) · proposals H89 / H86

## Cobertura

| Item | Esperado |
|---|---|
| H121 align | subscription POST e plans GET → owner \| admin |
| H89 / H86 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u125-01: doc cita H121 / H89 / H86  
- CT-u125-02: proposals existem; routes sem matches*  
- CT-u125-03: assert CI

# Harness — cancel POST ↔ plans GET refresh #13 (H211 / H206 · H90 · H86)

**Status:** harness de cobertura da nota refresh H206 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh13.md` (H206) · proposals H90 / H86

## Cobertura

| Item | Esperado |
|---|---|
| H206 refresh | cancel POST e plans GET → owner \| admin |
| H90 / H86 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u211-01: doc cita H206 / H90 / H86  
- CT-u211-02: proposals existem; routes sem matches*  
- CT-u211-03: assert CI

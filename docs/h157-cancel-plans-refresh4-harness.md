# Harness — cancel POST ↔ plans GET refresh #4 (H157 / H152 · H90 · H86)

**Status:** harness de cobertura da nota refresh H152 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh4.md` (H152) · proposals H90 / H86

## Cobertura

| Item | Esperado |
|---|---|
| H152 refresh | cancel POST e plans GET → owner \| admin |
| H90 / H86 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u157-01: doc cita H152 / H90 / H86  
- CT-u157-02: proposals existem; routes sem matches*  
- CT-u157-03: assert CI

# Harness — cancel POST ↔ plans GET refresh #3 (H151 / H146 · H90 · H86)

**Status:** harness de cobertura da nota refresh H146 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh3.md` (H146) · proposals H90 / H86

## Cobertura

| Item | Esperado |
|---|---|
| H146 refresh | cancel POST e plans GET → owner \| admin |
| H90 / H86 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u151-01: doc cita H146 / H90 / H86  
- CT-u151-02: proposals existem; routes sem matches*  
- CT-u151-03: assert CI

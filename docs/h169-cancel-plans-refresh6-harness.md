# Harness — cancel POST ↔ plans GET refresh #6 (H169 / H164 · H90 · H86)

**Status:** harness de cobertura da nota refresh H164 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh6.md` (H164) · proposals H90 / H86

## Cobertura

| Item | Esperado |
|---|---|
| H164 refresh | cancel POST e plans GET → owner \| admin |
| H90 / H86 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u169-01: doc cita H164 / H90 / H86  
- CT-u169-02: proposals existem; routes sem matches*  
- CT-u169-03: assert CI

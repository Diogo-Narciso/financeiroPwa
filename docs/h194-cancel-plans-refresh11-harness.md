# Harness — cancel POST ↔ plans GET refresh #11 (H199 / H194 · H90 · H86)

**Status:** harness de cobertura da nota refresh H194 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh11.md` (H194) · proposals H90 / H86

## Cobertura

| Item | Esperado |
|---|---|
| H194 refresh | cancel POST e plans GET → owner \| admin |
| H90 / H86 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u199-01: doc cita H194 / H90 / H86  
- CT-u199-02: proposals existem; routes sem matches*  
- CT-u199-03: assert CI

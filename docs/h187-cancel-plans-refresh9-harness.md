# Harness — cancel POST ↔ plans GET refresh #9 (H187 / H182 · H90 · H86)

**Status:** harness de cobertura da nota refresh H182 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh9.md` (H182) · proposals H90 / H86

## Cobertura

| Item | Esperado |
|---|---|
| H182 refresh | cancel POST e plans GET → owner \| admin |
| H90 / H86 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u187-01: doc cita H182 / H90 / H86  
- CT-u187-02: proposals existem; routes sem matches*  
- CT-u187-03: assert CI

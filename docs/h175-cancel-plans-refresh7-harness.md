# Harness — cancel POST ↔ plans GET refresh #7 (H175 / H170 · H90 · H86)

**Status:** harness de cobertura da nota refresh H170 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh7.md` (H170) · proposals H90 / H86

## Cobertura

| Item | Esperado |
|---|---|
| H170 refresh | cancel POST e plans GET → owner \| admin |
| H90 / H86 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u175-01: doc cita H170 / H90 / H86  
- CT-u175-02: proposals existem; routes sem matches*  
- CT-u175-03: assert CI

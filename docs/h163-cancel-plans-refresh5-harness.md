# Harness — cancel POST ↔ plans GET refresh #5 (H163 / H158 · H90 · H86)

**Status:** harness de cobertura da nota refresh H158 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh5.md` (H158) · proposals H90 / H86

## Cobertura

| Item | Esperado |
|---|---|
| H158 refresh | cancel POST e plans GET → owner \| admin |
| H90 / H86 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u163-01: doc cita H158 / H90 / H86  
- CT-u163-02: proposals existem; routes sem matches*  
- CT-u163-03: assert CI

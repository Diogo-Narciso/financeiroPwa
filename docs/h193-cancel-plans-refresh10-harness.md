# Harness — cancel POST ↔ plans GET refresh #10 (H193 / H188 · H90 · H86)

**Status:** harness de cobertura da nota refresh H188 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh10.md` (H188) · proposals H90 / H86

## Cobertura

| Item | Esperado |
|---|---|
| H188 refresh | cancel POST e plans GET → owner \| admin |
| H90 / H86 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u193-01: doc cita H188 / H90 / H86  
- CT-u193-02: proposals existem; routes sem matches*  
- CT-u193-03: assert CI

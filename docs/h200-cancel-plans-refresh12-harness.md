# Harness — cancel POST ↔ plans GET refresh #12 (H205 / H200 · H90 · H86)

**Status:** harness de cobertura da nota refresh H200 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh12.md` (H200) · proposals H90 / H86

## Cobertura

| Item | Esperado |
|---|---|
| H200 refresh | cancel POST e plans GET → owner \| admin |
| H90 / H86 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u205-01: doc cita H200 / H90 / H86  
- CT-u205-02: proposals existem; routes sem matches*  
- CT-u205-03: assert CI

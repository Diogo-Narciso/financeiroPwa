# Harness — cancel POST ↔ plans GET refresh #14 (H217 / H212 · H90 · H86)

**Status:** harness de cobertura da nota refresh H212 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh14.md` (H212) · proposals H90 / H86

## Cobertura

| Item | Esperado |
|---|---|
| H212 refresh | cancel POST e plans GET → owner \| admin |
| H90 / H86 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u217-01: doc cita H212 / H90 / H86  
- CT-u217-02: proposals existem; routes sem matches*  
- CT-u217-03: assert CI

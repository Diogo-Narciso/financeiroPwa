# Harness — cancel POST ↔ plans GET refresh #8 (H181 / H176 · H90 · H86)

**Status:** harness de cobertura da nota refresh H176 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh8.md` (H176) · proposals H90 / H86

## Cobertura

| Item | Esperado |
|---|---|
| H176 refresh | cancel POST e plans GET → owner \| admin |
| H90 / H86 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u181-01: doc cita H176 / H90 / H86  
- CT-u181-02: proposals existem; routes sem matches*  
- CT-u181-03: assert CI

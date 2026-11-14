# Harness — dual GET/POST subscription vs cancel refresh #22 (H253 / H248 · H94 · H90)

**Status:** harness de cobertura da nota refresh H248 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh22.md` (H248) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H248 refresh | subscription GET\|POST e cancel POST → owner \| admin |
| H94 / H90 | proposals existem |
| Routes | **sem** import dos helpers |

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eR01Closed` | **false** |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u253-01: doc cita H248 / H94 / H90  
- CT-u253-02: proposals existem; routes sem matches*  
- CT-u253-03: assert CI

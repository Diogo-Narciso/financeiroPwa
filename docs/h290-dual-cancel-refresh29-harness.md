# Harness — dual GET/POST subscription vs cancel refresh #29 (H295 / H290 · H94 · H90)

**Status:** harness de cobertura da nota refresh H290 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh29.md` (H290) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H290 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u295-01: doc cita H290 / H94 / H90  
- CT-u295-02: proposals existem; routes sem matches*  
- CT-u295-03: assert CI

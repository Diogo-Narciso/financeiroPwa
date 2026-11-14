# Harness — dual GET/POST subscription vs cancel refresh #37 (H343 / H338 · H94 · H90)

**Status:** harness de cobertura da nota refresh H338 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh37.md` (H338) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H338 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u343-01: doc cita H338 / H94 / H90  
- CT-u343-02: proposals existem; routes sem matches*  
- CT-u343-03: assert CI

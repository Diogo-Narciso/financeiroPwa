# Harness — dual GET/POST subscription vs cancel refresh #20 (H241 / H236 · H94 · H90)

**Status:** harness de cobertura da nota refresh H236 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh20.md` (H236) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H236 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u241-01: doc cita H236 / H94 / H90  
- CT-u241-02: proposals existem; routes sem matches*  
- CT-u241-03: assert CI

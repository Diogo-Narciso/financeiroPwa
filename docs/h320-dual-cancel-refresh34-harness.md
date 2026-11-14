# Harness — dual GET/POST subscription vs cancel refresh #34 (H325 / H320 · H94 · H90)

**Status:** harness de cobertura da nota refresh H320 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh34.md` (H320) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H320 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u325-01: doc cita H320 / H94 / H90  
- CT-u325-02: proposals existem; routes sem matches*  
- CT-u325-03: assert CI

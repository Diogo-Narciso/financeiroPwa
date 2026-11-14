# Harness — dual GET/POST subscription vs cancel refresh #33 (H319 / H314 · H94 · H90)

**Status:** harness de cobertura da nota refresh H314 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh33.md` (H314) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H314 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u319-01: doc cita H314 / H94 / H90  
- CT-u319-02: proposals existem; routes sem matches*  
- CT-u319-03: assert CI

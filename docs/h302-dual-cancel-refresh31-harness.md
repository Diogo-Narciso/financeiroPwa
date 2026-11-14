# Harness — dual GET/POST subscription vs cancel refresh #31 (H307 / H302 · H94 · H90)

**Status:** harness de cobertura da nota refresh H302 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh31.md` (H302) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H302 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u307-01: doc cita H302 / H94 / H90  
- CT-u307-02: proposals existem; routes sem matches*  
- CT-u307-03: assert CI

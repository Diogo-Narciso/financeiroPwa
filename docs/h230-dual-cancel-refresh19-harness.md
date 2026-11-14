# Harness — dual GET/POST subscription vs cancel refresh #19 (H235 / H230 · H94 · H90)

**Status:** harness de cobertura da nota refresh H230 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh19.md` (H230) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H230 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u235-01: doc cita H230 / H94 / H90  
- CT-u235-02: proposals existem; routes sem matches*  
- CT-u235-03: assert CI

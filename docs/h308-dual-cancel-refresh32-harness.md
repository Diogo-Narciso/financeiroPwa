# Harness — dual GET/POST subscription vs cancel refresh #32 (H313 / H308 · H94 · H90)

**Status:** harness de cobertura da nota refresh H308 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh32.md` (H308) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H308 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u313-01: doc cita H308 / H94 / H90  
- CT-u313-02: proposals existem; routes sem matches*  
- CT-u313-03: assert CI

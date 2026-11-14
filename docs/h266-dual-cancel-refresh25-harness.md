# Harness — dual GET/POST subscription vs cancel refresh #25 (H271 / H266 · H94 · H90)

**Status:** harness de cobertura da nota refresh H266 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh25.md` (H266) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H266 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u271-01: doc cita H266 / H94 / H90  
- CT-u271-02: proposals existem; routes sem matches*  
- CT-u271-03: assert CI

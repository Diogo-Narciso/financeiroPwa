# Harness — dual GET/POST subscription vs cancel refresh #26 (H277 / H272 · H94 · H90)

**Status:** harness de cobertura da nota refresh H272 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh26.md` (H272) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H272 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u277-01: doc cita H272 / H94 / H90  
- CT-u277-02: proposals existem; routes sem matches*  
- CT-u277-03: assert CI

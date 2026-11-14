# Harness — dual GET/POST subscription vs cancel refresh #30 (H301 / H296 · H94 · H90)

**Status:** harness de cobertura da nota refresh H296 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh30.md` (H296) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H296 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u301-01: doc cita H296 / H94 / H90  
- CT-u301-02: proposals existem; routes sem matches*  
- CT-u301-03: assert CI

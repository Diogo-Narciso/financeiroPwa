# Harness — dual GET/POST subscription vs cancel refresh #38 (H349 / H344 · H94 · H90)

**Status:** harness de cobertura da nota refresh H344 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh38.md` (H344) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H344 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u349-01: doc cita H344 / H94 / H90  
- CT-u349-02: proposals existem; routes sem matches*  
- CT-u349-03: assert CI

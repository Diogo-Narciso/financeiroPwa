# Harness — dual GET/POST subscription vs cancel refresh #21 (H247 / H242 · H94 · H90)

**Status:** harness de cobertura da nota refresh H242 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh21.md` (H242) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H242 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u247-01: doc cita H242 / H94 / H90  
- CT-u247-02: proposals existem; routes sem matches*  
- CT-u247-03: assert CI

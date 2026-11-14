# Harness — dual GET/POST subscription vs cancel refresh #18 (H229 / H224 · H94 · H90)

**Status:** harness de cobertura da nota refresh H224 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh18.md` (H224) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H224 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u229-01: doc cita H224 / H94 / H90  
- CT-u229-02: proposals existem; routes sem matches*  
- CT-u229-03: assert CI

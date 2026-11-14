# Harness — dual GET/POST subscription vs cancel refresh #35 (H331 / H326 · H94 · H90)

**Status:** harness de cobertura da nota refresh H326 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh35.md` (H326) · proposals H94 / H90

## Cobertura

| Item | Esperado |
|---|---|
| H326 refresh | subscription GET\|POST e cancel POST → owner \| admin |
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

- CT-u331-01: doc cita H326 / H94 / H90  
- CT-u331-02: proposals existem; routes sem matches*  
- CT-u331-03: assert CI

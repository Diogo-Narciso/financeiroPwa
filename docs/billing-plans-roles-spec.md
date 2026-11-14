# Spec — roles sugeridas `GET /api/billing/plans` (H84 / E-R01)

**Status:** especificação · **não** altera ACL · **não** fecha E-R01 / G-R01  
**Fontes:** H76 billing AUTH · `apps/web/src/app/api/billing/plans/route.ts`

## AS-IS

`GET /api/billing/plans` — AUTH (`requireUser`) sem array de roles.

## Proposta (draft)

| Path | Método | Roles sugeridas | Nota |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | leitura planos |

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eR01Closed` | **false** |

## Proibições

- Não editar a route neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-bp-01: cita billing/plans / AUTH / proposta  
- CT-bp-02: aclChangedInThisPR false  
- CT-bp-03: assert CI

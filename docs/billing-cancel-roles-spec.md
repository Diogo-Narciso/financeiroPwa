# Spec — roles sugeridas `POST /api/billing/cancel` (H90 / E-R01)

**Status:** especificação · **não** altera ACL · **não** fecha E-R01 / G-R01  
**Fontes:** H76 billing AUTH · H88 subscription · `apps/web/src/app/api/billing/cancel/route.ts`

## AS-IS

`POST /api/billing/cancel` — AUTH (`requireUser`) sem array de roles.

## Proposta (draft)

| Path | Método | Roles sugeridas | Nota |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | cancelamento assinatura |

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

- CT-bc-01: cita billing/cancel / AUTH / proposta  
- CT-bc-02: aclChangedInThisPR false  
- CT-bc-03: assert CI

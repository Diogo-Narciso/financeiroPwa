# Spec — roles sugeridas `quotas/entry-invoices/reserve` (H71 / E-R01)

**Status:** especificação · **não** altera ACL · **não** fecha E-R01 / G-R01  
**Fontes:** H67 invoices/quotas AUTH · `apps/web/src/app/api/quotas/entry-invoices/reserve/route.ts`

## AS-IS

`POST /api/quotas/entry-invoices/reserve` — AUTH (`requireUser`) sem array de roles.

## Proposta (draft)

| Path | Método | Roles sugeridas | Nota |
|---|---|---|---|
| `quotas/entry-invoices/reserve` | POST | owner \| admin \| analyst | reserva trial/cota |

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eR01Closed` | **false** |

## Proibições

- Não editar a route neste PR.
- Não inventar roles.
- Não fechar E-R01/G-R01.

## CTs

- CT-qr-01: cita quotas/reserve / AUTH / proposta  
- CT-qr-02: aclChangedInThisPR false  
- CT-qr-03: assert CI

# Spec — roles sugeridas `GET /api/quotas` (H74 / E-R01)

**Status:** especificação · **não** altera ACL · **não** fecha E-R01 / G-R01  
**Fontes:** H67 invoices/quotas AUTH · H71 reserve · `apps/web/src/app/api/quotas/route.ts`

## AS-IS

`GET /api/quotas` — AUTH (`requireUser`) sem array de roles; snapshot via `getQuotaSnapshot`.

## Proposta (draft)

| Path | Método | Roles sugeridas | Nota |
|---|---|---|---|
| `quotas` | GET | owner \| admin \| analyst \| reviewer | leitura cotas |

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eR01Closed` | **false** |

## Proibições

- Não editar `quotas/route.ts` neste PR.
- Não inventar roles.
- Não fechar E-R01/G-R01.

## CTs

- CT-qg-01: cita quotas GET / AUTH / proposta  
- CT-qg-02: aclChangedInThisPR false  
- CT-qg-03: assert CI

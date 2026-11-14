# Spec — roles sugeridas `GET /api/invoices` (H78 / E-R01)

**Status:** especificação · **não** altera ACL · **não** fecha E-R01 / G-R01  
**Fontes:** H67 invoices/quotas AUTH · `apps/web/src/app/api/invoices/route.ts`

## AS-IS

`GET /api/invoices` — AUTH (`requireUser`) sem array de roles; `companyId` obrigatório; tenant via sessão.

## Proposta (draft)

| Path | Método | Roles sugeridas | Nota |
|---|---|---|---|
| `invoices` | GET | owner \| admin \| analyst \| reviewer | listagem NF-e |

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eR01Closed` | **false** |

## Proibições

- Não editar `invoices/route.ts` neste PR.
- Não inventar roles.
- Não fechar E-R01/G-R01.

## CTs

- CT-il-01: cita invoices GET / AUTH / proposta  
- CT-il-02: aclChangedInThisPR false  
- CT-il-03: assert CI

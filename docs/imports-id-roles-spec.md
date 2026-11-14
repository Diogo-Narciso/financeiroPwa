# Spec — roles sugeridas `imports/[id]` (H68 / E-R01)

**Status:** especificação · **não** altera ACL · **não** fecha E-R01 / G-R01  
**Fontes:** H43 inventário · `apps/web/src/app/api/imports/[id]/route.ts`

## AS-IS

`GET /api/imports/[id]` — AUTH (`requireUser`) sem array de roles; tenant via query.

## Proposta (draft)

| Path | Método | Roles sugeridas | Nota |
|---|---|---|---|
| `imports/[id]` | GET | owner \| admin \| analyst \| reviewer | leitura lote |
| `imports/entries` | (já ROLE) | manter | fora deste cartão |

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eR01Closed` | **false** |

## Proibições

- Não editar `imports/[id]/route.ts` neste PR.
- Não inventar roles.
- Não fechar E-R01/G-R01.

## CTs

- CT-im-01: cita imports/[id] / AUTH / proposta  
- CT-im-02: aclChangedInThisPR false  
- CT-im-03: assert CI

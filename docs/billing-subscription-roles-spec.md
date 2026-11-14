# Spec — roles sugeridas `billing/subscription` (H88 / E-R01)

**Status:** especificação · **não** altera ACL · **não** fecha E-R01 / G-R01  
**Fontes:** H76 billing AUTH · H84 plans · `apps/web/src/app/api/billing/subscription/route.ts`

## AS-IS

`GET|POST /api/billing/subscription` — AUTH (`requireUser`) sem array de roles; provider mock_sandbox.

## Proposta (draft)

| Path | Método | Roles sugeridas | Nota |
|---|---|---|---|
| `billing/subscription` | GET | owner \| admin | leitura assinatura |
| `billing/subscription` | POST | owner \| admin | aceite plano / trial |

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

- CT-bs-01: cita billing/subscription / AUTH / proposta  
- CT-bs-02: aclChangedInThisPR false  
- CT-bs-03: assert CI

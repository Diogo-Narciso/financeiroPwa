# Nota refresh — subscription POST vs cancel POST (H130 / H112 · H96)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-subscription-post-cancel-align.md` (H112) · `docs/billing-subscription-post-cancel-align.md` / H96 align chain

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H88 / H112 |
| `billing/cancel` | POST | owner \| admin | H90 / H112 |

## Achado

Refresh confirma o mesmo draft `owner | admin` para subscription POST e cancel POST (H112); sem proposta owner-only.

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eR01Closed` | **false** |

## Proibições

- Não editar routes neste PR.
- Não inventar owner-only / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-scr-01: cita H112 / POST / owner|admin  
- CT-scr-02: aclChangedInThisPR false  
- CT-scr-03: assert CI

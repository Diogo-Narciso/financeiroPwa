# Nota refresh #2 — subscription POST vs cancel POST (H141 / H130 · H112)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh.md` (H130) · `docs/billing-subscription-post-cancel-align.md` (H112)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H130 / H112 |
| `billing/cancel` | POST | owner \| admin | H130 / H112 |

## Achado

Segundo refresh confirma o mesmo draft `owner | admin` para subscription POST e cancel POST; sem proposta owner-only.

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

- CT-scr2-01: cita H130 / H112 / POST  
- CT-scr2-02: aclChangedInThisPR false  
- CT-scr2-03: assert CI

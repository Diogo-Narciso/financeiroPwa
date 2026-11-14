# Nota refresh #14 — subscription POST vs cancel POST (H214 / H208 · H202)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh13.md` (H208) · `docs/billing-sub-post-cancel-refresh12.md` (H202)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H208 / H202 |
| `billing/cancel` | POST | owner \| admin | H208 / H202 |

## Achado

Décimo quarto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr14-01: cita H208 / H202 / POST  
- CT-scr14-02: aclChangedInThisPR false  
- CT-scr14-03: assert CI

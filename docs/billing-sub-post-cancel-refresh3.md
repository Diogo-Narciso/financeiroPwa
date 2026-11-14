# Nota refresh #3 — subscription POST vs cancel POST (H148 / H141 · H130)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh2.md` (H141) · `docs/billing-sub-post-cancel-refresh.md` (H130)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H141 / H130 |
| `billing/cancel` | POST | owner \| admin | H141 / H130 |

## Achado

Terceiro refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr3-01: cita H141 / H130 / POST  
- CT-scr3-02: aclChangedInThisPR false  
- CT-scr3-03: assert CI

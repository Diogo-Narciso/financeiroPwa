# Nota refresh #16 — subscription POST vs cancel POST (H226 / H220 · H214)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh15.md` (H220) · `docs/billing-sub-post-cancel-refresh14.md` (H214)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H220 / H214 |
| `billing/cancel` | POST | owner \| admin | H220 / H214 |

## Achado

Décimo sexto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr16-01: cita H220 / H214 / POST  
- CT-scr16-02: aclChangedInThisPR false  
- CT-scr16-03: assert CI

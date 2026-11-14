# Nota refresh #12 — subscription POST vs cancel POST (H202 / H196 · H190)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh11.md` (H196) · `docs/billing-sub-post-cancel-refresh10.md` (H190)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H196 / H190 |
| `billing/cancel` | POST | owner \| admin | H196 / H190 |

## Achado

Décimo segundo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr12-01: cita H196 / H190 / POST  
- CT-scr12-02: aclChangedInThisPR false  
- CT-scr12-03: assert CI

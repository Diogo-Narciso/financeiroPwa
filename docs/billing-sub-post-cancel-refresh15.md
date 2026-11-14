# Nota refresh #15 — subscription POST vs cancel POST (H220 / H214 · H208)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh14.md` (H214) · `docs/billing-sub-post-cancel-refresh13.md` (H208)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H214 / H208 |
| `billing/cancel` | POST | owner \| admin | H214 / H208 |

## Achado

Décimo quinto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr15-01: cita H214 / H208 / POST  
- CT-scr15-02: aclChangedInThisPR false  
- CT-scr15-03: assert CI

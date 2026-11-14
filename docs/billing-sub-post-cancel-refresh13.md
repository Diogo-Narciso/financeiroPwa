# Nota refresh #13 — subscription POST vs cancel POST (H208 / H202 · H196)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh12.md` (H202) · `docs/billing-sub-post-cancel-refresh11.md` (H196)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H202 / H196 |
| `billing/cancel` | POST | owner \| admin | H202 / H196 |

## Achado

Décimo terceiro refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr13-01: cita H202 / H196 / POST  
- CT-scr13-02: aclChangedInThisPR false  
- CT-scr13-03: assert CI

# Nota refresh #34 — subscription POST vs cancel POST (H334 / H328 · H322)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh33.md` (H328) · `docs/billing-sub-post-cancel-refresh32.md` (H322)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H328 / H322 |
| `billing/cancel` | POST | owner \| admin | H328 / H322 |

## Achado

Trigésimo quarto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr34-01: cita H328 / H322 / POST  
- CT-scr34-02: aclChangedInThisPR false  
- CT-scr34-03: assert CI

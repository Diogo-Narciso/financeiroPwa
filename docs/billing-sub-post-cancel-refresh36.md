# Nota refresh #36 — subscription POST vs cancel POST (H346 / H340 · H334)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh35.md` (H340) · `docs/billing-sub-post-cancel-refresh34.md` (H334)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H340 / H334 |
| `billing/cancel` | POST | owner \| admin | H340 / H334 |

## Achado

Trigésimo sexto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr36-01: cita H340 / H334 / POST  
- CT-scr36-02: aclChangedInThisPR false  
- CT-scr36-03: assert CI

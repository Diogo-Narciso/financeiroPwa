# Nota refresh #35 — subscription POST vs cancel POST (H340 / H334 · H328)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh34.md` (H334) · `docs/billing-sub-post-cancel-refresh33.md` (H328)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H334 / H328 |
| `billing/cancel` | POST | owner \| admin | H334 / H328 |

## Achado

Trigésimo quinto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr35-01: cita H334 / H328 / POST  
- CT-scr35-02: aclChangedInThisPR false  
- CT-scr35-03: assert CI

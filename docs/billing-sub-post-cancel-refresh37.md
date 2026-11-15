# Nota refresh #37 — subscription POST vs cancel POST (H352 / H346 · H340)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh36.md` (H346) · `docs/billing-sub-post-cancel-refresh35.md` (H340)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H346 / H340 |
| `billing/cancel` | POST | owner \| admin | H346 / H340 |

## Achado

Trigésimo sétimo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr37-01: cita H346 / H340 / POST  
- CT-scr37-02: aclChangedInThisPR false  
- CT-scr37-03: assert CI

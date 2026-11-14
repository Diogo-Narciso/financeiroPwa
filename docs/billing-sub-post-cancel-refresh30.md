# Nota refresh #30 — subscription POST vs cancel POST (H310 / H304 · H298)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh29.md` (H304) · `docs/billing-sub-post-cancel-refresh28.md` (H298)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H304 / H298 |
| `billing/cancel` | POST | owner \| admin | H304 / H298 |

## Achado

Trigésimo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr30-01: cita H304 / H298 / POST  
- CT-scr30-02: aclChangedInThisPR false  
- CT-scr30-03: assert CI

# Nota refresh #24 — subscription POST vs cancel POST (H274 / H268 · H262)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh23.md` (H268) · `docs/billing-sub-post-cancel-refresh22.md` (H262)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H268 / H262 |
| `billing/cancel` | POST | owner \| admin | H268 / H262 |

## Achado

Vigésimo quarto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr24-01: cita H268 / H262 / POST  
- CT-scr24-02: aclChangedInThisPR false  
- CT-scr24-03: assert CI

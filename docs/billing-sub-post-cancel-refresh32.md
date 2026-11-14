# Nota refresh #32 — subscription POST vs cancel POST (H322 / H316 · H310)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh31.md` (H316) · `docs/billing-sub-post-cancel-refresh30.md` (H310)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H316 / H310 |
| `billing/cancel` | POST | owner \| admin | H316 / H310 |

## Achado

Trigésimo segundo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr32-01: cita H316 / H310 / POST  
- CT-scr32-02: aclChangedInThisPR false  
- CT-scr32-03: assert CI

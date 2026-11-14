# Nota refresh #33 — subscription POST vs cancel POST (H328 / H322 · H316)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh32.md` (H322) · `docs/billing-sub-post-cancel-refresh31.md` (H316)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H322 / H316 |
| `billing/cancel` | POST | owner \| admin | H322 / H316 |

## Achado

Trigésimo terceiro refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr33-01: cita H322 / H316 / POST  
- CT-scr33-02: aclChangedInThisPR false  
- CT-scr33-03: assert CI

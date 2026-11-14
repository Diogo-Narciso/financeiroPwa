# Nota refresh #28 — subscription POST vs cancel POST (H298 / H292 · H286)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh27.md` (H292) · `docs/billing-sub-post-cancel-refresh26.md` (H286)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H292 / H286 |
| `billing/cancel` | POST | owner \| admin | H292 / H286 |

## Achado

Vigésimo oitavo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr28-01: cita H292 / H286 / POST  
- CT-scr28-02: aclChangedInThisPR false  
- CT-scr28-03: assert CI

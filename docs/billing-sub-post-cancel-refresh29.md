# Nota refresh #29 — subscription POST vs cancel POST (H304 / H298 · H292)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh28.md` (H298) · `docs/billing-sub-post-cancel-refresh27.md` (H292)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H298 / H292 |
| `billing/cancel` | POST | owner \| admin | H298 / H292 |

## Achado

Vigésimo nono refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr29-01: cita H298 / H292 / POST  
- CT-scr29-02: aclChangedInThisPR false  
- CT-scr29-03: assert CI

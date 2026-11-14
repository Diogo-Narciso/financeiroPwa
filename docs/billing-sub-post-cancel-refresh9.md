# Nota refresh #9 — subscription POST vs cancel POST (H184 / H178 · H172)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh8.md` (H178) · `docs/billing-sub-post-cancel-refresh7.md` (H172)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H178 / H172 |
| `billing/cancel` | POST | owner \| admin | H178 / H172 |

## Achado

Nono refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr9-01: cita H178 / H172 / POST  
- CT-scr9-02: aclChangedInThisPR false  
- CT-scr9-03: assert CI

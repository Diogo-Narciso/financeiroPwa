# Nota refresh #17 — subscription POST vs cancel POST (H232 / H226 · H220)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh16.md` (H226) · `docs/billing-sub-post-cancel-refresh15.md` (H220)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H226 / H220 |
| `billing/cancel` | POST | owner \| admin | H226 / H220 |

## Achado

Décimo sétimo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr17-01: cita H226 / H220 / POST  
- CT-scr17-02: aclChangedInThisPR false  
- CT-scr17-03: assert CI

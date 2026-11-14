# Nota refresh #7 — subscription POST vs cancel POST (H172 / H166 · H160)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh6.md` (H166) · `docs/billing-sub-post-cancel-refresh5.md` (H160)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H166 / H160 |
| `billing/cancel` | POST | owner \| admin | H166 / H160 |

## Achado

Sétimo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr7-01: cita H166 / H160 / POST  
- CT-scr7-02: aclChangedInThisPR false  
- CT-scr7-03: assert CI

# Nota refresh #8 — subscription POST vs cancel POST (H178 / H172 · H166)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh7.md` (H172) · `docs/billing-sub-post-cancel-refresh6.md` (H166)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H172 / H166 |
| `billing/cancel` | POST | owner \| admin | H172 / H166 |

## Achado

Oitavo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr8-01: cita H172 / H166 / POST  
- CT-scr8-02: aclChangedInThisPR false  
- CT-scr8-03: assert CI

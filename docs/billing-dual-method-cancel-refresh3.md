# Nota refresh #3 — dual GET/POST subscription vs cancel (H138 / H132 · H127)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh2.md` (H132) · `docs/billing-dual-method-cancel-refresh.md` (H127)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H132 / H127 |
| `billing/cancel` | POST | owner \| admin | H132 / H127 |

## Achado

Terceiro refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr3-01: cita H132 / H127 / GET / POST  
- CT-dcr3-02: aclChangedInThisPR false  
- CT-dcr3-03: assert CI

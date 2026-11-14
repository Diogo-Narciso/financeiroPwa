# Nota refresh #12 — dual GET/POST subscription vs cancel (H191 / H185 · H179)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh11.md` (H185) · `docs/billing-dual-method-cancel-refresh10.md` (H179)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H185 / H179 |
| `billing/cancel` | POST | owner \| admin | H185 / H179 |

## Achado

Décimo segundo refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr12-01: cita H185 / H179 / GET / POST  
- CT-dcr12-02: aclChangedInThisPR false  
- CT-dcr12-03: assert CI

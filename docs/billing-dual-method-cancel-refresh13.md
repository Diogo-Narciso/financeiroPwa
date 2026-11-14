# Nota refresh #13 — dual GET/POST subscription vs cancel (H197 / H191 · H185)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh12.md` (H191) · `docs/billing-dual-method-cancel-refresh11.md` (H185)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H191 / H185 |
| `billing/cancel` | POST | owner \| admin | H191 / H185 |

## Achado

Décimo terceiro refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr13-01: cita H191 / H185 / GET / POST  
- CT-dcr13-02: aclChangedInThisPR false  
- CT-dcr13-03: assert CI

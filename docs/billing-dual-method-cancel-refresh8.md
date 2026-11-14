# Nota refresh #8 — dual GET/POST subscription vs cancel (H167 / H161 · H155)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh7.md` (H161) · `docs/billing-dual-method-cancel-refresh6.md` (H155)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H161 / H155 |
| `billing/cancel` | POST | owner \| admin | H161 / H155 |

## Achado

Oitavo refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr8-01: cita H161 / H155 / GET / POST  
- CT-dcr8-02: aclChangedInThisPR false  
- CT-dcr8-03: assert CI

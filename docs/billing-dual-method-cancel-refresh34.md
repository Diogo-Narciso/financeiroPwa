# Nota refresh #34 — dual GET/POST subscription vs cancel (H320 / H314 · H308)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh33.md` (H314) · `docs/billing-dual-method-cancel-refresh32.md` (H308)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H314 / H308 |
| `billing/cancel` | POST | owner \| admin | H314 / H308 |

## Achado

Trigésimo quarto refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr34-01: cita H314 / H308 / GET / POST  
- CT-dcr34-02: aclChangedInThisPR false  
- CT-dcr34-03: assert CI

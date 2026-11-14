# Nota refresh #33 — dual GET/POST subscription vs cancel (H314 / H308 · H302)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh32.md` (H308) · `docs/billing-dual-method-cancel-refresh31.md` (H302)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H308 / H302 |
| `billing/cancel` | POST | owner \| admin | H308 / H302 |

## Achado

Trigésimo terceiro refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr33-01: cita H308 / H302 / GET / POST  
- CT-dcr33-02: aclChangedInThisPR false  
- CT-dcr33-03: assert CI

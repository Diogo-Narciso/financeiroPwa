# Nota refresh #32 — dual GET/POST subscription vs cancel (H308 / H302 · H296)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh31.md` (H302) · `docs/billing-dual-method-cancel-refresh30.md` (H296)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H302 / H296 |
| `billing/cancel` | POST | owner \| admin | H302 / H296 |

## Achado

Trigésimo segundo refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr32-01: cita H302 / H296 / GET / POST  
- CT-dcr32-02: aclChangedInThisPR false  
- CT-dcr32-03: assert CI

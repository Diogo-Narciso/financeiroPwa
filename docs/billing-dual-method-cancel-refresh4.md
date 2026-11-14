# Nota refresh #4 — dual GET/POST subscription vs cancel (H143 / H138 · H132)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh3.md` (H138) · `docs/billing-dual-method-cancel-refresh2.md` (H132)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H138 / H132 |
| `billing/cancel` | POST | owner \| admin | H138 / H132 |

## Achado

Quarto refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr4-01: cita H138 / H132 / GET / POST  
- CT-dcr4-02: aclChangedInThisPR false  
- CT-dcr4-03: assert CI

# Nota refresh — dual GET/POST subscription vs cancel (H127 / H118 · H94)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-note.md` (H118) · `docs/billing-subscription-dual-method-note.md` (H94)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H94 / H118 |
| `billing/cancel` | POST | owner \| admin | H112 / H118 |

## Achado

Refresh confirma convergência dual-method + cancel no draft `owner | admin` (H118); sem proposta owner-only.

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

- CT-dcr-01: cita H118 / H94 / GET / POST  
- CT-dcr-02: aclChangedInThisPR false  
- CT-dcr-03: assert CI

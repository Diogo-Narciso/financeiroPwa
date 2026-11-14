# Nota refresh #2 — dual GET/POST subscription vs cancel (H132 / H127 · H118)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh.md` (H127) · `docs/billing-dual-method-cancel-note.md` (H118)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H127 / H118 |
| `billing/cancel` | POST | owner \| admin | H127 / H118 |

## Achado

Segundo refresh confirma convergência dual-method + cancel no draft `owner | admin` (H127); sem proposta owner-only.

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

- CT-dcr2-01: cita H127 / H118 / GET / POST  
- CT-dcr2-02: aclChangedInThisPR false  
- CT-dcr2-03: assert CI

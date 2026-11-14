# Nota refresh #24 — dual GET/POST subscription vs cancel (H260 / H254 · H248)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh23.md` (H254) · `docs/billing-dual-method-cancel-refresh22.md` (H248)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H254 / H248 |
| `billing/cancel` | POST | owner \| admin | H254 / H248 |

## Achado

Vigésimo quarto refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr24-01: cita H254 / H248 / GET / POST  
- CT-dcr24-02: aclChangedInThisPR false  
- CT-dcr24-03: assert CI

# Nota refresh #6 — dual GET/POST subscription vs cancel (H155 / H149 · H143)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh5.md` (H149) · `docs/billing-dual-method-cancel-refresh4.md` (H143)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H149 / H143 |
| `billing/cancel` | POST | owner \| admin | H149 / H143 |

## Achado

Sexto refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr6-01: cita H149 / H143 / GET / POST  
- CT-dcr6-02: aclChangedInThisPR false  
- CT-dcr6-03: assert CI

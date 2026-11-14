# Nota refresh #23 — dual GET/POST subscription vs cancel (H254 / H248 · H242)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh22.md` (H248) · `docs/billing-dual-method-cancel-refresh21.md` (H242)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H248 / H242 |
| `billing/cancel` | POST | owner \| admin | H248 / H242 |

## Achado

Vigésimo terceiro refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr23-01: cita H248 / H242 / GET / POST  
- CT-dcr23-02: aclChangedInThisPR false  
- CT-dcr23-03: assert CI

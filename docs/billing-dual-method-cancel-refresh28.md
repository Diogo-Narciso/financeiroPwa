# Nota refresh #28 — dual GET/POST subscription vs cancel (H284 / H278 · H272)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh27.md` (H278) · `docs/billing-dual-method-cancel-refresh26.md` (H272)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H278 / H272 |
| `billing/cancel` | POST | owner \| admin | H278 / H272 |

## Achado

Vigésimo oitavo refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr28-01: cita H278 / H272 / GET / POST  
- CT-dcr28-02: aclChangedInThisPR false  
- CT-dcr28-03: assert CI

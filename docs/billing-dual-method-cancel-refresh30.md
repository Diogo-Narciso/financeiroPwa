# Nota refresh #30 — dual GET/POST subscription vs cancel (H296 / H290 · H284)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh29.md` (H290) · `docs/billing-dual-method-cancel-refresh28.md` (H284)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H290 / H284 |
| `billing/cancel` | POST | owner \| admin | H290 / H284 |

## Achado

Trigésimo refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr30-01: cita H290 / H284 / GET / POST  
- CT-dcr30-02: aclChangedInThisPR false  
- CT-dcr30-03: assert CI

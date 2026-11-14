# Nota refresh #31 — dual GET/POST subscription vs cancel (H302 / H296 · H290)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh30.md` (H296) · `docs/billing-dual-method-cancel-refresh29.md` (H290)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H296 / H290 |
| `billing/cancel` | POST | owner \| admin | H296 / H290 |

## Achado

Trigésimo primeiro refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr31-01: cita H296 / H290 / GET / POST  
- CT-dcr31-02: aclChangedInThisPR false  
- CT-dcr31-03: assert CI

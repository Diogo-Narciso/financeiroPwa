# Nota refresh #37 — dual GET/POST subscription vs cancel (H338 / H332 · H326)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh36.md` (H332) · `docs/billing-dual-method-cancel-refresh35.md` (H326)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H332 / H326 |
| `billing/cancel` | POST | owner \| admin | H332 / H326 |

## Achado

Trigésimo sétimo refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr37-01: cita H332 / H326 / GET / POST  
- CT-dcr37-02: aclChangedInThisPR false  
- CT-dcr37-03: assert CI

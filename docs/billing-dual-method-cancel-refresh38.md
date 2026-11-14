# Nota refresh #38 — dual GET/POST subscription vs cancel (H344 / H338 · H332)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh37.md` (H338) · `docs/billing-dual-method-cancel-refresh36.md` (H332)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H338 / H332 |
| `billing/cancel` | POST | owner \| admin | H338 / H332 |

## Achado

Trigésimo oitavo refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr38-01: cita H338 / H332 / GET / POST  
- CT-dcr38-02: aclChangedInThisPR false  
- CT-dcr38-03: assert CI

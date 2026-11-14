# Nota refresh #22 — dual GET/POST subscription vs cancel (H248 / H242 · H236)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh21.md` (H242) · `docs/billing-dual-method-cancel-refresh20.md` (H236)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H242 / H236 |
| `billing/cancel` | POST | owner \| admin | H242 / H236 |

## Achado

Vigésimo segundo refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr22-01: cita H242 / H236 / GET / POST  
- CT-dcr22-02: aclChangedInThisPR false  
- CT-dcr22-03: assert CI

# Nota refresh #5 — dual GET/POST subscription vs cancel (H149 / H143 · H138)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh4.md` (H143) · `docs/billing-dual-method-cancel-refresh3.md` (H138)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H143 / H138 |
| `billing/cancel` | POST | owner \| admin | H143 / H138 |

## Achado

Quinto refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr5-01: cita H143 / H138 / GET / POST  
- CT-dcr5-02: aclChangedInThisPR false  
- CT-dcr5-03: assert CI

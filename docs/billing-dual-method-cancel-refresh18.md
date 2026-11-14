# Nota refresh #18 — dual GET/POST subscription vs cancel (H224 / H221 · H215)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh17.md` (H221) · `docs/billing-dual-method-cancel-refresh16.md` (H215)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H221 / H215 |
| `billing/cancel` | POST | owner \| admin | H221 / H215 |

## Achado

Décimo oitavo refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr18-01: cita H221 / H215 / GET / POST  
- CT-dcr18-02: aclChangedInThisPR false  
- CT-dcr18-03: assert CI

# Nota refresh #17 — dual GET/POST subscription vs cancel (H221 / H215 · H209)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh16.md` (H215) · `docs/billing-dual-method-cancel-refresh15.md` (H209)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H215 / H209 |
| `billing/cancel` | POST | owner \| admin | H215 / H209 |

## Achado

Décimo sétimo refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr17-01: cita H215 / H209 / GET / POST  
- CT-dcr17-02: aclChangedInThisPR false  
- CT-dcr17-03: assert CI

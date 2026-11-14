# Nota refresh #7 — dual GET/POST subscription vs cancel (H161 / H155 · H149)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh6.md` (H155) · `docs/billing-dual-method-cancel-refresh5.md` (H149)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H155 / H149 |
| `billing/cancel` | POST | owner \| admin | H155 / H149 |

## Achado

Sétimo refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr7-01: cita H155 / H149 / GET / POST  
- CT-dcr7-02: aclChangedInThisPR false  
- CT-dcr7-03: assert CI

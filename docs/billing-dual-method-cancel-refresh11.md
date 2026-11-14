# Nota refresh #11 — dual GET/POST subscription vs cancel (H185 / H179 · H173)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh10.md` (H179) · `docs/billing-dual-method-cancel-refresh9.md` (H173)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H179 / H173 |
| `billing/cancel` | POST | owner \| admin | H179 / H173 |

## Achado

Décimo primeiro refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr11-01: cita H179 / H173 / GET / POST  
- CT-dcr11-02: aclChangedInThisPR false  
- CT-dcr11-03: assert CI

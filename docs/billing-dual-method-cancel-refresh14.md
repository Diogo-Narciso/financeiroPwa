# Nota refresh #14 — dual GET/POST subscription vs cancel (H203 / H197 · H191)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh13.md` (H197) · `docs/billing-dual-method-cancel-refresh12.md` (H191)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H197 / H191 |
| `billing/cancel` | POST | owner \| admin | H197 / H191 |

## Achado

Décimo quarto refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr14-01: cita H197 / H191 / GET / POST  
- CT-dcr14-02: aclChangedInThisPR false  
- CT-dcr14-03: assert CI

# Nota refresh #10 — dual GET/POST subscription vs cancel (H179 / H173 · H167)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh9.md` (H173) · `docs/billing-dual-method-cancel-refresh8.md` (H167)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H173 / H167 |
| `billing/cancel` | POST | owner \| admin | H173 / H167 |

## Achado

Décimo refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr10-01: cita H173 / H167 / GET / POST  
- CT-dcr10-02: aclChangedInThisPR false  
- CT-dcr10-03: assert CI

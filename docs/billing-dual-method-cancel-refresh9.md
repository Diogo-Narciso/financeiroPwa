# Nota refresh #9 — dual GET/POST subscription vs cancel (H173 / H167 · H161)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh8.md` (H167) · `docs/billing-dual-method-cancel-refresh7.md` (H161)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H167 / H161 |
| `billing/cancel` | POST | owner \| admin | H167 / H161 |

## Achado

Nono refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr9-01: cita H167 / H161 / GET / POST  
- CT-dcr9-02: aclChangedInThisPR false  
- CT-dcr9-03: assert CI

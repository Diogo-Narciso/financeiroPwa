# Nota refresh #35 — dual GET/POST subscription vs cancel (H326 / H320 · H314)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh34.md` (H320) · `docs/billing-dual-method-cancel-refresh33.md` (H314)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H320 / H314 |
| `billing/cancel` | POST | owner \| admin | H320 / H314 |

## Achado

Trigésimo quinto refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr35-01: cita H320 / H314 / GET / POST  
- CT-dcr35-02: aclChangedInThisPR false  
- CT-dcr35-03: assert CI

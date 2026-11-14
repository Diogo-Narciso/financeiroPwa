# Nota refresh #12 — cancel POST vs plans GET (H200 / H194 · H188)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh11.md` (H194) · `docs/billing-cancel-plans-refresh10.md` (H188)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H194 / H188 |
| `billing/plans` | GET | owner \| admin | H194 / H188 |

## Achado

Décimo segundo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr12-01: cita H194 / H188 / POST / GET  
- CT-cpr12-02: aclChangedInThisPR false  
- CT-cpr12-03: assert CI

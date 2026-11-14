# Nota refresh #4 — cancel POST vs plans GET (H152 / H146 · H135)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh3.md` (H146) · `docs/billing-cancel-plans-refresh2.md` (H135)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | H146 / H135 |
| `billing/cancel` | POST | owner \| admin | H146 / H135 |

## Achado

Quarto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr4-01: cita H146 / H135 / GET / POST  
- CT-cpr4-02: aclChangedInThisPR false  
- CT-cpr4-03: assert CI

# Nota refresh #14 — cancel POST vs plans GET (H212 / H206 · H200)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh13.md` (H206) · `docs/billing-cancel-plans-refresh12.md` (H200)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H206 / H200 |
| `billing/plans` | GET | owner \| admin | H206 / H200 |

## Achado

Décimo quarto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr14-01: cita H206 / H200 / POST / GET  
- CT-cpr14-02: aclChangedInThisPR false  
- CT-cpr14-03: assert CI

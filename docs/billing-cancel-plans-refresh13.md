# Nota refresh #13 — cancel POST vs plans GET (H206 / H200 · H194)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh12.md` (H200) · `docs/billing-cancel-plans-refresh11.md` (H194)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H200 / H194 |
| `billing/plans` | GET | owner \| admin | H200 / H194 |

## Achado

Décimo terceiro refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr13-01: cita H200 / H194 / POST / GET  
- CT-cpr13-02: aclChangedInThisPR false  
- CT-cpr13-03: assert CI

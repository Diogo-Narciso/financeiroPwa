# Nota refresh #18 — cancel POST vs plans GET (H239 / H233 · H227)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh17.md` (H233) · `docs/billing-cancel-plans-refresh16.md` (H227)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H233 / H227 |
| `billing/plans` | GET | owner \| admin | H233 / H227 |

## Achado

Décimo oitavo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr18-01: cita H233 / H227 / GET / POST  
- CT-cpr18-02: aclChangedInThisPR false  
- CT-cpr18-03: assert CI

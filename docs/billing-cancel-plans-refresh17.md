# Nota refresh #17 — cancel POST vs plans GET (H233 / H227 · H218)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh16.md` (H227) · `docs/billing-cancel-plans-refresh15.md` (H218)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H227 / H218 |
| `billing/plans` | GET | owner \| admin | H227 / H218 |

## Achado

Décimo sétimo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr17-01: cita H227 / H218 / GET / POST  
- CT-cpr17-02: aclChangedInThisPR false  
- CT-cpr17-03: assert CI

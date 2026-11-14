# Nota refresh #16 — cancel POST vs plans GET (H227 / H218 · H212)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh15.md` (H218) · `docs/billing-cancel-plans-refresh14.md` (H212)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H218 / H212 |
| `billing/plans` | GET | owner \| admin | H218 / H212 |

## Achado

Décimo sexto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr16-01: cita H218 / H212 / GET / POST  
- CT-cpr16-02: aclChangedInThisPR false  
- CT-cpr16-03: assert CI

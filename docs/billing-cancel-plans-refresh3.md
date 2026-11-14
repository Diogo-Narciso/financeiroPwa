# Nota refresh #3 — cancel POST vs plans GET (H146 / H135 · H124)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh2.md` (H135) · `docs/billing-cancel-plans-refresh-note.md` (H124)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | H135 / H124 |
| `billing/cancel` | POST | owner \| admin | H135 / H124 |

## Achado

Terceiro refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr3-01: cita H135 / H124 / GET / POST  
- CT-cpr3-02: aclChangedInThisPR false  
- CT-cpr3-03: assert CI

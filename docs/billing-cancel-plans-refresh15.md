# Nota refresh #15 — cancel POST vs plans GET (H218 / H212 · H206)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh14.md` (H212) · `docs/billing-cancel-plans-refresh13.md` (H206)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H212 / H206 |
| `billing/plans` | GET | owner \| admin | H212 / H206 |

## Achado

Décimo quinto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr15-01: cita H212 / H206 / POST / GET  
- CT-cpr15-02: aclChangedInThisPR false  
- CT-cpr15-03: assert CI

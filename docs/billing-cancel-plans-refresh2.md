# Nota refresh #2 — cancel POST vs plans GET (H135 / H124 · H109)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh-note.md` (H124) · `docs/billing-cancel-plans-method-note.md` (H109)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | H84 / H124 |
| `billing/cancel` | POST | owner \| admin | H90 / H124 |

## Achado

Segundo refresh confirma o mesmo draft `owner | admin` (H124); sem proposta owner-only.

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

- CT-cpr2-01: cita H124 / H109 / GET / POST  
- CT-cpr2-02: aclChangedInThisPR false  
- CT-cpr2-03: assert CI

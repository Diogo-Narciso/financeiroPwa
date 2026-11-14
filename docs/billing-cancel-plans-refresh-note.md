# Nota refresh — cancel POST vs plans GET (H124 / H109 · H115)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-method-note.md` (H109) · `docs/billing-plans-get-cancel-cross.md` (H115)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | H84 / H115 |
| `billing/cancel` | POST | owner \| admin | H90 / H109 |

## Achado

Refresh confirma o mesmo draft `owner | admin` (H109 + H115); sem proposta owner-only.

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

- CT-cpr-01: cita H109 / H115 / GET / POST  
- CT-cpr-02: aclChangedInThisPR false  
- CT-cpr-03: assert CI

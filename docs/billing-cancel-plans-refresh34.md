# Nota refresh #34 — cancel POST vs plans GET (H335 / H329 · H323)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh33.md` (H329) · `docs/billing-cancel-plans-refresh32.md` (H323)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H329 / H323 |
| `billing/plans` | GET | owner \| admin | H329 / H323 |

## Achado

Trigésimo quarto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr34-01: cita H329 / H323 / GET / POST  
- CT-cpr34-02: aclChangedInThisPR false  
- CT-cpr34-03: assert CI

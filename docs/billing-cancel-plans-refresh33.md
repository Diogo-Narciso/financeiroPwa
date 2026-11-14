# Nota refresh #33 — cancel POST vs plans GET (H329 / H323 · H317)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh32.md` (H323) · `docs/billing-cancel-plans-refresh31.md` (H317)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H323 / H317 |
| `billing/plans` | GET | owner \| admin | H323 / H317 |

## Achado

Trigésimo terceiro refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr33-01: cita H323 / H317 / GET / POST  
- CT-cpr33-02: aclChangedInThisPR false  
- CT-cpr33-03: assert CI

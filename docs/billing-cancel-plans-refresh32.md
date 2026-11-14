# Nota refresh #32 — cancel POST vs plans GET (H323 / H317 · H311)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh31.md` (H317) · `docs/billing-cancel-plans-refresh30.md` (H311)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H317 / H311 |
| `billing/plans` | GET | owner \| admin | H317 / H311 |

## Achado

Trigésimo segundo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr32-01: cita H317 / H311 / GET / POST  
- CT-cpr32-02: aclChangedInThisPR false  
- CT-cpr32-03: assert CI

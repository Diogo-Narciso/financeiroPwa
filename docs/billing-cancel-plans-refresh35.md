# Nota refresh #35 — cancel POST vs plans GET (H341 / H335 · H329)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh34.md` (H335) · `docs/billing-cancel-plans-refresh33.md` (H329)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H335 / H329 |
| `billing/plans` | GET | owner \| admin | H335 / H329 |

## Achado

Trigésimo quinto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr35-01: cita H335 / H329 / GET / POST  
- CT-cpr35-02: aclChangedInThisPR false  
- CT-cpr35-03: assert CI

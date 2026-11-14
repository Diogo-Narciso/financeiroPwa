# Nota refresh #36 — cancel POST vs plans GET (H347 / H341 · H335)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh35.md` (H341) · `docs/billing-cancel-plans-refresh34.md` (H335)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H341 / H335 |
| `billing/plans` | GET | owner \| admin | H341 / H335 |

## Achado

Trigésimo sexto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr36-01: cita H341 / H335 / GET / POST  
- CT-cpr36-02: aclChangedInThisPR false  
- CT-cpr36-03: assert CI

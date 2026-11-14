# Nota refresh #26 — cancel POST vs plans GET (H287 / H281 · H275)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh25.md` (H281) · `docs/billing-cancel-plans-refresh24.md` (H275)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H281 / H275 |
| `billing/plans` | GET | owner \| admin | H281 / H275 |

## Achado

Vigésimo sexto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr26-01: cita H281 / H275 / GET / POST  
- CT-cpr26-02: aclChangedInThisPR false  
- CT-cpr26-03: assert CI

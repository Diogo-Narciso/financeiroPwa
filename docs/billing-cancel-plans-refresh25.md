# Nota refresh #25 — cancel POST vs plans GET (H281 / H275 · H269)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh24.md` (H275) · `docs/billing-cancel-plans-refresh23.md` (H269)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H275 / H269 |
| `billing/plans` | GET | owner \| admin | H275 / H269 |

## Achado

Vigésimo quinto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr25-01: cita H275 / H269 / GET / POST  
- CT-cpr25-02: aclChangedInThisPR false  
- CT-cpr25-03: assert CI

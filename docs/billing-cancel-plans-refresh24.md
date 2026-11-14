# Nota refresh #24 — cancel POST vs plans GET (H275 / H269 · H263)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh23.md` (H269) · `docs/billing-cancel-plans-refresh22.md` (H263)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H269 / H263 |
| `billing/plans` | GET | owner \| admin | H269 / H263 |

## Achado

Vigésimo quarto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr24-01: cita H269 / H263 / GET / POST  
- CT-cpr24-02: aclChangedInThisPR false  
- CT-cpr24-03: assert CI

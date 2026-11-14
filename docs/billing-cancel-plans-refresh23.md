# Nota refresh #23 — cancel POST vs plans GET (H269 / H263 · H257)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh22.md` (H263) · `docs/billing-cancel-plans-refresh21.md` (H257)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H263 / H257 |
| `billing/plans` | GET | owner \| admin | H263 / H257 |

## Achado

Vigésimo terceiro refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr23-01: cita H263 / H257 / GET / POST  
- CT-cpr23-02: aclChangedInThisPR false  
- CT-cpr23-03: assert CI

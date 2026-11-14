# Nota refresh #30 — cancel POST vs plans GET (H311 / H305 · H299)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh29.md` (H305) · `docs/billing-cancel-plans-refresh28.md` (H299)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H305 / H299 |
| `billing/plans` | GET | owner \| admin | H305 / H299 |

## Achado

Trigésimo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr30-01: cita H305 / H299 / GET / POST  
- CT-cpr30-02: aclChangedInThisPR false  
- CT-cpr30-03: assert CI

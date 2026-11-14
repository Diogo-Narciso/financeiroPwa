# Nota refresh #11 — cancel POST vs plans GET (H194 / H188 · H182)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh10.md` (H188) · `docs/billing-cancel-plans-refresh9.md` (H182)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | H188 / H182 |
| `billing/cancel` | POST | owner \| admin | H188 / H182 |

## Achado

Décimo primeiro refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr11-01: cita H188 / H182 / GET / POST  
- CT-cpr11-02: aclChangedInThisPR false  
- CT-cpr11-03: assert CI

# Nota refresh #7 — cancel POST vs plans GET (H170 / H164 · H158)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh6.md` (H164) · `docs/billing-cancel-plans-refresh5.md` (H158)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | H164 / H158 |
| `billing/cancel` | POST | owner \| admin | H164 / H158 |

## Achado

Sétimo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr7-01: cita H164 / H158 / GET / POST  
- CT-cpr7-02: aclChangedInThisPR false  
- CT-cpr7-03: assert CI

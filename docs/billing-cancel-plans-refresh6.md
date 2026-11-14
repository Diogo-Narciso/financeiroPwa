# Nota refresh #6 — cancel POST vs plans GET (H164 / H158 · H152)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh5.md` (H158) · `docs/billing-cancel-plans-refresh4.md` (H152)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | H158 / H152 |
| `billing/cancel` | POST | owner \| admin | H158 / H152 |

## Achado

Sexto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr6-01: cita H158 / H152 / GET / POST  
- CT-cpr6-02: aclChangedInThisPR false  
- CT-cpr6-03: assert CI

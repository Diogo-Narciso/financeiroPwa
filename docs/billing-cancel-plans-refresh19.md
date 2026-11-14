# Nota refresh #19 — cancel POST vs plans GET (H245 / H239 · H233)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh18.md` (H239) · `docs/billing-cancel-plans-refresh17.md` (H233)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H239 / H233 |
| `billing/plans` | GET | owner \| admin | H239 / H233 |

## Achado

Décimo nono refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr19-01: cita H239 / H233 / GET / POST  
- CT-cpr19-02: aclChangedInThisPR false  
- CT-cpr19-03: assert CI

# Nota refresh #4 — subscription POST vs cancel POST (H154 / H148 · H141)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh3.md` (H148) · `docs/billing-sub-post-cancel-refresh2.md` (H141)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H148 / H141 |
| `billing/cancel` | POST | owner \| admin | H148 / H141 |

## Achado

Quarto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr4-01: cita H148 / H141 / POST  
- CT-scr4-02: aclChangedInThisPR false  
- CT-scr4-03: assert CI

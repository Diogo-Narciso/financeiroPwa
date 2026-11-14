# Nota refresh #5 — subscription POST vs cancel POST (H160 / H154 · H148)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh4.md` (H154) · `docs/billing-sub-post-cancel-refresh3.md` (H148)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H154 / H148 |
| `billing/cancel` | POST | owner \| admin | H154 / H148 |

## Achado

Quinto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr5-01: cita H154 / H148 / POST  
- CT-scr5-02: aclChangedInThisPR false  
- CT-scr5-03: assert CI

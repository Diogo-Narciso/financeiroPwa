# Nota refresh #6 — subscription POST vs cancel POST (H166 / H160 · H154)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh5.md` (H160) · `docs/billing-sub-post-cancel-refresh4.md` (H154)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H160 / H154 |
| `billing/cancel` | POST | owner \| admin | H160 / H154 |

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

- CT-scr6-01: cita H160 / H154 / POST  
- CT-scr6-02: aclChangedInThisPR false  
- CT-scr6-03: assert CI

# Nota refresh #19 — subscription POST vs cancel POST (H244 / H238 · H232)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh18.md` (H238) · `docs/billing-sub-post-cancel-refresh17.md` (H232)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H238 / H232 |
| `billing/cancel` | POST | owner \| admin | H238 / H232 |

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

- CT-scr19-01: cita H238 / H232 / POST  
- CT-scr19-02: aclChangedInThisPR false  
- CT-scr19-03: assert CI

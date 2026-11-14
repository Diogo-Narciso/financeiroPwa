# Nota refresh #18 — subscription POST vs cancel POST (H238 / H232 · H226)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh17.md` (H232) · `docs/billing-sub-post-cancel-refresh16.md` (H226)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H232 / H226 |
| `billing/cancel` | POST | owner \| admin | H232 / H226 |

## Achado

Décimo oitavo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr18-01: cita H232 / H226 / POST  
- CT-scr18-02: aclChangedInThisPR false  
- CT-scr18-03: assert CI

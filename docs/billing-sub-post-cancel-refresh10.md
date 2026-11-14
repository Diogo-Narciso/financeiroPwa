# Nota refresh #10 — subscription POST vs cancel POST (H190 / H184 · H178)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh9.md` (H184) · `docs/billing-sub-post-cancel-refresh8.md` (H178)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H184 / H178 |
| `billing/cancel` | POST | owner \| admin | H184 / H178 |

## Achado

Décimo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr10-01: cita H184 / H178 / POST  
- CT-scr10-02: aclChangedInThisPR false  
- CT-scr10-03: assert CI

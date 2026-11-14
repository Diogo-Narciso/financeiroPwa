# Nota refresh #27 — subscription POST vs cancel POST (H292 / H286 · H280)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh26.md` (H286) · `docs/billing-sub-post-cancel-refresh25.md` (H280)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H286 / H280 |
| `billing/cancel` | POST | owner \| admin | H286 / H280 |

## Achado

Vigésimo sétimo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr27-01: cita H286 / H280 / POST  
- CT-scr27-02: aclChangedInThisPR false  
- CT-scr27-03: assert CI

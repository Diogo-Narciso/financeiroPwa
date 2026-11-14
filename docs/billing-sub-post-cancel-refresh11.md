# Nota refresh #11 — subscription POST vs cancel POST (H196 / H190 · H184)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh10.md` (H190) · `docs/billing-sub-post-cancel-refresh9.md` (H184)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H190 / H184 |
| `billing/cancel` | POST | owner \| admin | H190 / H184 |

## Achado

Décimo primeiro refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr11-01: cita H190 / H184 / POST  
- CT-scr11-02: aclChangedInThisPR false  
- CT-scr11-03: assert CI

# Nota refresh #26 — subscription POST vs cancel POST (H286 / H280 · H274)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh25.md` (H280) · `docs/billing-sub-post-cancel-refresh24.md` (H274)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H280 / H274 |
| `billing/cancel` | POST | owner \| admin | H280 / H274 |

## Achado

Vigésimo sexto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr26-01: cita H280 / H274 / POST  
- CT-scr26-02: aclChangedInThisPR false  
- CT-scr26-03: assert CI

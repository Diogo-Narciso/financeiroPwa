# Nota refresh #23 — subscription POST vs cancel POST (H268 / H262 · H256)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh22.md` (H262) · `docs/billing-sub-post-cancel-refresh21.md` (H256)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H262 / H256 |
| `billing/cancel` | POST | owner \| admin | H262 / H256 |

## Achado

Vigésimo terceiro refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr23-01: cita H262 / H256 / POST  
- CT-scr23-02: aclChangedInThisPR false  
- CT-scr23-03: assert CI

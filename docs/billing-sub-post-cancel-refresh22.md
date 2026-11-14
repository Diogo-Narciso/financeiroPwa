# Nota refresh #22 — subscription POST vs cancel POST (H262 / H256 · H250)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh21.md` (H256) · `docs/billing-sub-post-cancel-refresh20.md` (H250)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H256 / H250 |
| `billing/cancel` | POST | owner \| admin | H256 / H250 |

## Achado

Vigésimo segundo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr22-01: cita H256 / H250 / POST  
- CT-scr22-02: aclChangedInThisPR false  
- CT-scr22-03: assert CI

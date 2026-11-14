# Nota refresh #21 — subscription POST vs cancel POST (H256 / H250 · H244)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh20.md` (H250) · `docs/billing-sub-post-cancel-refresh19.md` (H244)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H250 / H244 |
| `billing/cancel` | POST | owner \| admin | H250 / H244 |

## Achado

Vigésimo primeiro refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr21-01: cita H250 / H244 / POST  
- CT-scr21-02: aclChangedInThisPR false  
- CT-scr21-03: assert CI

# Nota refresh #20 — subscription POST vs cancel POST (H250 / H244 · H238)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh19.md` (H244) · `docs/billing-sub-post-cancel-refresh18.md` (H238)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H244 / H238 |
| `billing/cancel` | POST | owner \| admin | H244 / H238 |

## Achado

Vigésimo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr20-01: cita H244 / H238 / POST  
- CT-scr20-02: aclChangedInThisPR false  
- CT-scr20-03: assert CI

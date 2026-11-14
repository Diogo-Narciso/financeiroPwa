# Nota refresh #31 — subscription POST vs cancel POST (H316 / H310 · H304)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh30.md` (H310) · `docs/billing-sub-post-cancel-refresh29.md` (H304)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H310 / H304 |
| `billing/cancel` | POST | owner \| admin | H310 / H304 |

## Achado

Trigésimo primeiro refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr31-01: cita H310 / H304 / POST  
- CT-scr31-02: aclChangedInThisPR false  
- CT-scr31-03: assert CI

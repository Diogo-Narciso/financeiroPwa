# Nota refresh #25 — subscription POST vs cancel POST (H280 / H274 · H268)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-sub-post-cancel-refresh24.md` (H274) · `docs/billing-sub-post-cancel-refresh23.md` (H268)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H274 / H268 |
| `billing/cancel` | POST | owner \| admin | H274 / H268 |

## Achado

Vigésimo quinto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-scr25-01: cita H274 / H268 / POST  
- CT-scr25-02: aclChangedInThisPR false  
- CT-scr25-03: assert CI

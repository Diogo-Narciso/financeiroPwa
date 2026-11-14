# Nota — dual GET/POST subscription vs cancel (H118 / H94 · H112)

**Status:** nota de alinhamento · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-subscription-dual-method-note.md` (H94) · `docs/billing-subscription-post-cancel-align.md` (H112)

## Comparativo

| Path | Métodos | Roles draft |
|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin |
| `billing/cancel` | POST | owner \| admin |

## Achado

Dual-method subscription e cancel POST convergem no mesmo draft (H94 + H112).

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eR01Closed` | **false** |

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-dc-01: cita H94 / H112 / GET / POST  
- CT-dc-02: aclChangedInThisPR false  
- CT-dc-03: assert CI

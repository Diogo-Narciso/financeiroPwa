# Nota refresh #40 — dual GET/POST subscription vs cancel (H356 / H350 · H344)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh39.md` (H350) · `docs/billing-dual-method-cancel-refresh38.md` (H344)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H350 / H344 |
| `billing/cancel` | POST | owner \| admin | H350 / H344 |

## Achado

Refresh #40 mantém dual-method cancel AS-IS; sem mudança de ACL neste PR.

## Flags

- aclChangedInThisPR: false

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh356-01: cita H350 / H344 / GET / POST  
- CT-hh356-02: aclChangedInThisPR false  
- CT-hh356-03: assert CI

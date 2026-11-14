# Nota refresh #29 — dual GET/POST subscription vs cancel (H290 / H284 · H278)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh28.md` (H284) · `docs/billing-dual-method-cancel-refresh27.md` (H278)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H284 / H278 |
| `billing/cancel` | POST | owner \| admin | H284 / H278 |

## Achado

Vigésimo nono refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr29-01: cita H284 / H278 / GET / POST  
- CT-dcr29-02: aclChangedInThisPR false  
- CT-dcr29-03: assert CI

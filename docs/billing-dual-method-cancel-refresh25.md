# Nota refresh #25 — dual GET/POST subscription vs cancel (H266 / H260 · H254)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh24.md` (H260) · `docs/billing-dual-method-cancel-refresh23.md` (H254)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H260 / H254 |
| `billing/cancel` | POST | owner \| admin | H260 / H254 |

## Achado

Vigésimo quinto refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr25-01: cita H260 / H254 / GET / POST  
- CT-dcr25-02: aclChangedInThisPR false  
- CT-dcr25-03: assert CI

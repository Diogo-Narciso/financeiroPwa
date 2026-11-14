# Nota refresh #20 — dual GET/POST subscription vs cancel (H236 / H230 · H224)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh19.md` (H230) · `docs/billing-dual-method-cancel-refresh18.md` (H224)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H230 / H224 |
| `billing/cancel` | POST | owner \| admin | H230 / H224 |

## Achado

Vigésimo refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr20-01: cita H230 / H224 / GET / POST  
- CT-dcr20-02: aclChangedInThisPR false  
- CT-dcr20-03: assert CI

# Nota refresh #15 — dual GET/POST subscription vs cancel (H209 / H203 · H197)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh14.md` (H203) · `docs/billing-dual-method-cancel-refresh13.md` (H197)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H203 / H197 |
| `billing/cancel` | POST | owner \| admin | H203 / H197 |

## Achado

Décimo quinto refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr15-01: cita H203 / H197 / GET / POST  
- CT-dcr15-02: aclChangedInThisPR false  
- CT-dcr15-03: assert CI

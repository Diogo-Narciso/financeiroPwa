# Nota refresh #26 — dual GET/POST subscription vs cancel (H272 / H266 · H260)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh25.md` (H266) · `docs/billing-dual-method-cancel-refresh24.md` (H260)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H266 / H260 |
| `billing/cancel` | POST | owner \| admin | H266 / H260 |

## Achado

Vigésimo sexto refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr26-01: cita H266 / H260 / GET / POST  
- CT-dcr26-02: aclChangedInThisPR false  
- CT-dcr26-03: assert CI

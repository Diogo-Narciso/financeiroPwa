# Nota refresh #27 — dual GET/POST subscription vs cancel (H278 / H272 · H266)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh26.md` (H272) · `docs/billing-dual-method-cancel-refresh25.md` (H266)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H272 / H266 |
| `billing/cancel` | POST | owner \| admin | H272 / H266 |

## Achado

Vigésimo sétimo refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr27-01: cita H272 / H266 / GET / POST  
- CT-dcr27-02: aclChangedInThisPR false  
- CT-dcr27-03: assert CI

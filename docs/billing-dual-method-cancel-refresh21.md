# Nota refresh #21 — dual GET/POST subscription vs cancel (H242 / H236 · H230)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh20.md` (H236) · `docs/billing-dual-method-cancel-refresh19.md` (H230)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H236 / H230 |
| `billing/cancel` | POST | owner \| admin | H236 / H230 |

## Achado

Vigésimo primeiro refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr21-01: cita H236 / H230 / GET / POST  
- CT-dcr21-02: aclChangedInThisPR false  
- CT-dcr21-03: assert CI

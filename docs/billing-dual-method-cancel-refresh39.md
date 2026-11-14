# Nota refresh #39 — dual GET/POST subscription vs cancel (H350 / H344 · H338)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh38.md` (H344) · `docs/billing-dual-method-cancel-refresh37.md` (H338)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H344 / H338 |
| `billing/cancel` | POST | owner \| admin | H344 / H338 |

## Achado

Trigésimo nono refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr39-01: cita H344 / H338 / GET / POST  
- CT-dcr39-02: aclChangedInThisPR false  
- CT-dcr39-03: assert CI

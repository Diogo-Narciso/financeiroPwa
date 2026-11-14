# Nota refresh #36 — dual GET/POST subscription vs cancel (H332 / H326 · H320)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-refresh35.md` (H326) · `docs/billing-dual-method-cancel-refresh34.md` (H320)

## Comparativo

| Path | Métodos | Roles draft | Fonte |
|---|---|---|---|
| `billing/subscription` | GET \| POST | owner \| admin | H326 / H320 |
| `billing/cancel` | POST | owner \| admin | H326 / H320 |

## Achado

Trigésimo sexto refresh confirma convergência dual-method + cancel no draft `owner | admin`; sem proposta owner-only.

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

- CT-dcr36-01: cita H326 / H320 / GET / POST  
- CT-dcr36-02: aclChangedInThisPR false  
- CT-dcr36-03: assert CI

# Nota refresh #28 — cancel POST vs plans GET (H299 / H293 · H287)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh27.md` (H293) · `docs/billing-cancel-plans-refresh26.md` (H287)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H293 / H287 |
| `billing/plans` | GET | owner \| admin | H293 / H287 |

## Achado

Vigésimo oitavo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr28-01: cita H293 / H287 / GET / POST  
- CT-cpr28-02: aclChangedInThisPR false  
- CT-cpr28-03: assert CI

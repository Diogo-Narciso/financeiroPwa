# Nota refresh #27 — cancel POST vs plans GET (H293 / H287 · H281)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh26.md` (H287) · `docs/billing-cancel-plans-refresh25.md` (H281)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H287 / H281 |
| `billing/plans` | GET | owner \| admin | H287 / H281 |

## Achado

Vigésimo sétimo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr27-01: cita H287 / H281 / GET / POST  
- CT-cpr27-02: aclChangedInThisPR false  
- CT-cpr27-03: assert CI

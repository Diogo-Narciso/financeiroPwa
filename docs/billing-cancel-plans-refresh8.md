# Nota refresh #8 — cancel POST vs plans GET (H176 / H170 · H164)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh7.md` (H170) · `docs/billing-cancel-plans-refresh6.md` (H164)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | H170 / H164 |
| `billing/cancel` | POST | owner \| admin | H170 / H164 |

## Achado

Oitavo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr8-01: cita H170 / H164 / GET / POST  
- CT-cpr8-02: aclChangedInThisPR false  
- CT-cpr8-03: assert CI

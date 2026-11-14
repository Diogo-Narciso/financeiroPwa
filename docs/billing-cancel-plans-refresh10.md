# Nota refresh #10 — cancel POST vs plans GET (H188 / H182 · H176)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh9.md` (H182) · `docs/billing-cancel-plans-refresh8.md` (H176)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | H182 / H176 |
| `billing/cancel` | POST | owner \| admin | H182 / H176 |

## Achado

Décimo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr10-01: cita H182 / H176 / GET / POST  
- CT-cpr10-02: aclChangedInThisPR false  
- CT-cpr10-03: assert CI

# Nota refresh #22 — cancel POST vs plans GET (H263 / H257 · H251)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh21.md` (H257) · `docs/billing-cancel-plans-refresh20.md` (H251)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H257 / H251 |
| `billing/plans` | GET | owner \| admin | H257 / H251 |

## Achado

Vigésimo segundo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr22-01: cita H257 / H251 / GET / POST  
- CT-cpr22-02: aclChangedInThisPR false  
- CT-cpr22-03: assert CI

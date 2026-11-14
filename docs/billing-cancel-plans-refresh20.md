# Nota refresh #20 — cancel POST vs plans GET (H251 / H245 · H239)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh19.md` (H245) · `docs/billing-cancel-plans-refresh18.md` (H239)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H245 / H239 |
| `billing/plans` | GET | owner \| admin | H245 / H239 |

## Achado

Vigésimo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr20-01: cita H245 / H239 / GET / POST  
- CT-cpr20-02: aclChangedInThisPR false  
- CT-cpr20-03: assert CI

# Nota refresh #37 — cancel POST vs plans GET (H353 / H347 · H341)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh36.md` (H347) · `docs/billing-cancel-plans-refresh35.md` (H341)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H347 / H341 |
| `billing/plans` | GET | owner \| admin | H347 / H341 |

## Achado

Trigésimo sétimo refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr37-01: cita H347 / H341 / GET / POST  
- CT-cpr37-02: aclChangedInThisPR false  
- CT-cpr37-03: assert CI

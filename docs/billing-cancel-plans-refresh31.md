# Nota refresh #31 — cancel POST vs plans GET (H317 / H311 · H305)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh30.md` (H311) · `docs/billing-cancel-plans-refresh29.md` (H305)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H311 / H305 |
| `billing/plans` | GET | owner \| admin | H311 / H305 |

## Achado

Trigésimo primeiro refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr31-01: cita H311 / H305 / GET / POST  
- CT-cpr31-02: aclChangedInThisPR false  
- CT-cpr31-03: assert CI

# Nota refresh #5 — cancel POST vs plans GET (H158 / H152 · H146)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh4.md` (H152) · `docs/billing-cancel-plans-refresh3.md` (H146)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | H152 / H146 |
| `billing/cancel` | POST | owner \| admin | H152 / H146 |

## Achado

Quinto refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr5-01: cita H152 / H146 / GET / POST  
- CT-cpr5-02: aclChangedInThisPR false  
- CT-cpr5-03: assert CI

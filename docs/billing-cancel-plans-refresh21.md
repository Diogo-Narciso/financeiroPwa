# Nota refresh #21 — cancel POST vs plans GET (H257 / H251 · H245)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh20.md` (H251) · `docs/billing-cancel-plans-refresh19.md` (H245)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H251 / H245 |
| `billing/plans` | GET | owner \| admin | H251 / H245 |

## Achado

Vigésimo primeiro refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr21-01: cita H251 / H245 / GET / POST  
- CT-cpr21-02: aclChangedInThisPR false  
- CT-cpr21-03: assert CI

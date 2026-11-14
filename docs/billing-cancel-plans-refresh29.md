# Nota refresh #29 — cancel POST vs plans GET (H305 / H299 · H293)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh28.md` (H299) · `docs/billing-cancel-plans-refresh27.md` (H293)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/cancel` | POST | owner \| admin | H299 / H293 |
| `billing/plans` | GET | owner \| admin | H299 / H293 |

## Achado

Vigésimo nono refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr29-01: cita H299 / H293 / GET / POST  
- CT-cpr29-02: aclChangedInThisPR false  
- CT-cpr29-03: assert CI

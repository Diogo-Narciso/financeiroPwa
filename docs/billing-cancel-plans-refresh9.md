# Nota refresh #9 — cancel POST vs plans GET (H182 / H176 · H170)

**Status:** nota de refresh · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh8.md` (H176) · `docs/billing-cancel-plans-refresh7.md` (H170)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | H176 / H170 |
| `billing/cancel` | POST | owner \| admin | H176 / H170 |

## Achado

Nono refresh confirma o mesmo draft `owner | admin`; sem proposta owner-only.

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

- CT-cpr9-01: cita H176 / H170 / GET / POST  
- CT-cpr9-02: aclChangedInThisPR false  
- CT-cpr9-03: assert CI

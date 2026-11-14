# Align — subscription POST ↔ plans GET (H121 / H88 · H84)

**Status:** alinhamento de propostas · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-subscription-roles-spec.md` (H88) · `docs/billing-plans-roles-spec.md` (H84)

## Comparativo

| Path | Método | Roles sugeridas |
|---|---|---|
| `billing/plans` | GET | owner \| admin |
| `billing/subscription` | POST | owner \| admin |

## Achado

Leitura de planos e aceite/trial de assinatura compartilham o draft `owner | admin`.

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eR01Closed` | **false** |

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-spg-01: cita H84 / H88 / GET / POST  
- CT-spg-02: aclChangedInThisPR false  
- CT-spg-03: assert CI

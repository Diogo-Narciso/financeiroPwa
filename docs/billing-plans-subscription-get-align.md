# Align — plans GET ↔ subscription GET (H106 / H84 · H88)

**Status:** alinhamento de propostas · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-plans-roles-spec.md` (H84) · `docs/billing-subscription-roles-spec.md` (H88)

## Comparativo

| Path | Método | Roles sugeridas | Fonte |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | H84 |
| `billing/subscription` | GET | owner \| admin | H88 |

## Achado

Leituras de planos e assinatura compartilham o mesmo draft `owner | admin`.  
POST subscription (aceite/trial) também owner|admin (H88/H94) — fora do foco GET deste cartão.

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

- CT-psg-01: cita H84 / H88 / GET / owner|admin  
- CT-psg-02: aclChangedInThisPR false  
- CT-psg-03: assert CI

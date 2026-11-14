# Align — subscription POST ↔ cancel POST (H112 / H88 · H90)

**Status:** alinhamento de propostas · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-subscription-roles-spec.md` (H88) · `docs/billing-cancel-roles-spec.md` (H90) · H96

## Comparativo

| Path | Método | Roles sugeridas | Fonte |
|---|---|---|---|
| `billing/subscription` | POST | owner \| admin | H88 |
| `billing/cancel` | POST | owner \| admin | H90 |

## Achado

Mutações de assinatura (aceite/trial vs cancelamento) compartilham o mesmo draft `owner | admin`.  
AS-IS: ambas AUTH (`requireUser`) sem role array (E-R01).

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

- CT-spc-01: cita H88 / H90 / POST / owner|admin  
- CT-spc-02: aclChangedInThisPR false  
- CT-spc-03: assert CI

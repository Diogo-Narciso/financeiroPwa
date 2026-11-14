# Align — cancel ↔ subscription roles (H96 / H90 · H88)

**Status:** alinhamento de propostas · **não** altera ACL · **não** fecha E-R01 / G-R01  
**Fontes:** `docs/billing-cancel-roles-spec.md` (H90) · `docs/billing-subscription-roles-spec.md` (H88)

## Comparativo

| Path | Método | Roles sugeridas | Fonte |
|---|---|---|---|
| `billing/subscription` | GET | owner \| admin | H88 |
| `billing/subscription` | POST | owner \| admin | H88 |
| `billing/cancel` | POST | owner \| admin | H90 |

## Achado

Propostas alinhadas: cancel e subscription sugerem o mesmo conjunto `owner | admin`.  
AS-IS: ambas as routes permanecem AUTH (`requireUser`) sem role array (E-R01).

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eR01Closed` | **false** |

## Proibições

- Não editar routes billing neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-csa-01: cita H88 / H90 / owner|admin  
- CT-csa-02: aclChangedInThisPR false  
- CT-csa-03: assert CI

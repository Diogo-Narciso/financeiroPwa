# Align — cancel ↔ plans roles (H100 / H90 · H84)

**Status:** alinhamento de propostas · **não** altera ACL · **não** fecha E-R01 / G-R01  
**Fontes:** `docs/billing-cancel-roles-spec.md` (H90) · `docs/billing-plans-roles-spec.md` (H84) · H96 cancel↔subscription

## Comparativo

| Path | Método | Roles sugeridas | Fonte |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | H84 |
| `billing/cancel` | POST | owner \| admin | H90 |
| `billing/subscription` | GET\|POST | owner \| admin | H88 / H96 |

## Achado

Propostas alinhadas no mesmo conjunto `owner | admin` (leitura planos e cancelamento).  
Não há proposta “owner-only” distinta — cancel e plans compartilham o draft H84/H90.  
AS-IS: routes AUTH (`requireUser`) sem role array (E-R01).

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eR01Closed` | **false** |

## Proibições

- Não editar routes billing neste PR.
- Não inventar roles “owner-only” / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-cpa-01: cita H84 / H90 / owner|admin  
- CT-cpa-02: aclChangedInThisPR false  
- CT-cpa-03: assert CI

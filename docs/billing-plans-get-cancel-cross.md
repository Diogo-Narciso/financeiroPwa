# Cross — plans GET vs cancel POST (H115 / H106 · H109 · H100)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-plans-subscription-get-align.md` (H106) · `docs/billing-cancel-plans-method-note.md` (H109)

## Comparativo

| Path | Método | Roles draft | Fonte |
|---|---|---|---|
| `billing/plans` | GET | owner \| admin | H84 / H106 |
| `billing/cancel` | POST | owner \| admin | H90 / H109 |

## Achado

Mesmo draft apesar de métodos distintos (leitura vs cancelamento) — alinhado a H100/H109.

## Proibições

- Não editar routes neste PR.
- Não inventar owner-only / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-pgc-01: cita H106 / H109 / GET / POST  
- CT-pgc-02: proíbe alterar ACL  
- CT-pgc-03: assert CI

# Cross-index — billing ↔ invoices/quotas AUTH (H85 / H76 · H67)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** H76 billing · H67 invoices/quotas · specs H74/H78/H84

## Comparativo

| Área | Paths | Tag |
|---|---|---|
| billing | plans · subscription · cancel | AUTH (H76) |
| invoices | GET list | AUTH (H78) |
| quotas | GET · reserve POST | AUTH (H74/H71) |

## Achado

| ID | Nota | Pri |
|---|---|---|
| E-R01 | billing + invoices + quotas AUTH sem role array | P2 |

## Proibições

- Não editar handlers neste PR.
- Não inventar roles.
- Não fechar E-R01/G-R01.

## CTs

- CT-bi-01: cita H76 / H67 / E-R01  
- CT-bi-02: proíbe alterar ACL  
- CT-bi-03: assert CI

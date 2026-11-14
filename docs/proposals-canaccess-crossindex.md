# Cross-index — role proposals ↔ canAccess* (H93 / H87 · H73)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01 / G-R01  
**Fontes:** `docs/role-proposal-helpers-glossary.md` (H87) · `docs/canaccess-helpers-glossary.md` (H73)

## Comparativo

| Família | Exemplos | Wired? |
|---|---|---|
| `canAccess*` | tax-run · export-download | sim (H53/H54/…) |
| `matches*RoleProposal` | companies GET · imports · quotas · invoices · billing* | **não** (harness) |

## Achado

| ID | Nota | Pri |
|---|---|---|
| G-R01 | matriz unificada ainda aberta | P2 |
| E-R01 | proposals documentam AUTH sem fechar gap | P2 |

## Proibições

- Não unificar helpers / wire proposals neste PR.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-pc-01: cita H87 / H73 / canAccess / role proposal  
- CT-pc-02: proíbe wire/fechar gaps  
- CT-pc-03: assert CI

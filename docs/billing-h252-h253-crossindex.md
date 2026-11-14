# Cross-index — H252 H246↔H247 ↔ H253 dual-cancel harness (H258)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h246-h247-crossindex.md` (H252) · `docs/h248-dual-cancel-refresh22-harness.md` (H253)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H252 | H246 cross ↔ H247 billing | owner \| admin |
| H253 | dual-method cancel harness #22 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh258-01: cita H252 / H253 / owner|admin  
- CT-hh258-02: proíbe alterar ACL  
- CT-hh258-03: assert CI

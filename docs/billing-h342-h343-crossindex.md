# Cross-index — H342 H336↔H337 ↔ H343 dual-cancel harness (H348)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h336-h337-crossindex.md` (H342) · `docs/h338-dual-cancel-refresh37-harness.md` (H343)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H342 | H336 cross ↔ H337 billing | owner \| admin |
| H343 | dual-method cancel harness #37 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh348-01: cita H342 / H343 / owner|admin  
- CT-hh348-02: proíbe alterar ACL  
- CT-hh348-03: assert CI

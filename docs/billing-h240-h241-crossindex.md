# Cross-index — H240 H234↔H235 ↔ H241 dual-cancel harness (H246)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h234-h235-crossindex.md` (H240) · `docs/h236-dual-cancel-refresh20-harness.md` (H241)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H240 | H234 cross ↔ H235 billing | owner \| admin |
| H241 | dual-method cancel harness #20 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh246-01: cita H240 / H241 / owner|admin  
- CT-hh246-02: proíbe alterar ACL  
- CT-hh246-03: assert CI

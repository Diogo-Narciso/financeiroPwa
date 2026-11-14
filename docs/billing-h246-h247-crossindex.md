# Cross-index — H246 H240↔H241 ↔ H247 dual-cancel harness (H252)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h240-h241-crossindex.md` (H246) · `docs/h242-dual-cancel-refresh21-harness.md` (H247)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H246 | H240 cross ↔ H241 billing | owner \| admin |
| H247 | dual-method cancel harness #21 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh252-01: cita H246 / H247 / owner|admin  
- CT-hh252-02: proíbe alterar ACL  
- CT-hh252-03: assert CI

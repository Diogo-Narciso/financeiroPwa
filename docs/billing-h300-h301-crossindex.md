# Cross-index — H300 H294↔H295 ↔ H301 dual-cancel harness (H306)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h294-h295-crossindex.md` (H300) · `docs/h296-dual-cancel-refresh30-harness.md` (H301)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H300 | H294 cross ↔ H295 billing | owner \| admin |
| H301 | dual-method cancel harness #30 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh306-01: cita H300 / H301 / owner|admin  
- CT-hh306-02: proíbe alterar ACL  
- CT-hh306-03: assert CI

# Cross-index — H312 H306↔H307 ↔ H313 dual-cancel harness (H318)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h306-h307-crossindex.md` (H312) · `docs/h308-dual-cancel-refresh32-harness.md` (H313)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H312 | H306 cross ↔ H307 billing | owner \| admin |
| H313 | dual-method cancel harness #32 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh318-01: cita H312 / H313 / owner|admin  
- CT-hh318-02: proíbe alterar ACL  
- CT-hh318-03: assert CI

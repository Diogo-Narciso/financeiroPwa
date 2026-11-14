# Cross-index — H134 H129↔H128 ↔ H133 dual-cancel harness (H139)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h129-h128-crossindex.md` (H134) · `docs/h133-dual-cancel-refresh-harness.md` (H133)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H134 | H129 cross ↔ H128 harness | owner \| admin |
| H133 | dual-method cancel refresh harness | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh-01: cita H134 / H133 / owner|admin  
- CT-hh-02: proíbe alterar ACL  
- CT-hh-03: assert CI

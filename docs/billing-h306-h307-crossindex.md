# Cross-index — H306 H300↔H301 ↔ H307 dual-cancel harness (H312)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h300-h301-crossindex.md` (H306) · `docs/h302-dual-cancel-refresh31-harness.md` (H307)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H306 | H300 cross ↔ H301 billing | owner \| admin |
| H307 | dual-method cancel harness #31 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh312-01: cita H306 / H307 / owner|admin  
- CT-hh312-02: proíbe alterar ACL  
- CT-hh312-03: assert CI

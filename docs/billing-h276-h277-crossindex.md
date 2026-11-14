# Cross-index — H276 H270↔H271 ↔ H277 dual-cancel harness (H282)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h270-h271-crossindex.md` (H276) · `docs/h272-dual-cancel-refresh26-harness.md` (H277)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H276 | H270 cross ↔ H271 billing | owner \| admin |
| H277 | dual-method cancel harness #26 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh282-01: cita H276 / H277 / owner|admin  
- CT-hh282-02: proíbe alterar ACL  
- CT-hh282-03: assert CI

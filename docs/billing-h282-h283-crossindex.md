# Cross-index — H282 H276↔H277 ↔ H283 dual-cancel harness (H288)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h276-h277-crossindex.md` (H282) · `docs/h278-dual-cancel-refresh27-harness.md` (H283)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H282 | H276 cross ↔ H277 billing | owner \| admin |
| H283 | dual-method cancel harness #27 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh288-01: cita H282 / H283 / owner|admin  
- CT-hh288-02: proíbe alterar ACL  
- CT-hh288-03: assert CI

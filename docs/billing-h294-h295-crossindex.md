# Cross-index — H294 H288↔H289 ↔ H295 dual-cancel harness (H300)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h288-h289-crossindex.md` (H294) · `docs/h290-dual-cancel-refresh29-harness.md` (H295)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H294 | H288 cross ↔ H289 billing | owner \| admin |
| H295 | dual-method cancel harness #29 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh300-01: cita H294 / H295 / owner|admin  
- CT-hh300-02: proíbe alterar ACL  
- CT-hh300-03: assert CI

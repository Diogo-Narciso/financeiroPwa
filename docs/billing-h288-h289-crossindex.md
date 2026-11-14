# Cross-index — H288 H282↔H283 ↔ H289 dual-cancel harness (H294)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h282-h283-crossindex.md` (H288) · `docs/h284-dual-cancel-refresh28-harness.md` (H289)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H288 | H282 cross ↔ H283 billing | owner \| admin |
| H289 | dual-method cancel harness #28 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh294-01: cita H288 / H289 / owner|admin  
- CT-hh294-02: proíbe alterar ACL  
- CT-hh294-03: assert CI

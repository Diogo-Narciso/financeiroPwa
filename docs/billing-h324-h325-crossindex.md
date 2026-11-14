# Cross-index — H324 H318↔H319 ↔ H325 dual-cancel harness (H330)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h318-h319-crossindex.md` (H324) · `docs/h320-dual-cancel-refresh34-harness.md` (H325)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H324 | H318 cross ↔ H319 billing | owner \| admin |
| H325 | dual-method cancel harness #34 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh330-01: cita H324 / H325 / owner|admin  
- CT-hh330-02: proíbe alterar ACL  
- CT-hh330-03: assert CI

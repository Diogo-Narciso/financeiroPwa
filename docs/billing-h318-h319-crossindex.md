# Cross-index — H318 H312↔H313 ↔ H319 dual-cancel harness (H324)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h312-h313-crossindex.md` (H318) · `docs/h314-dual-cancel-refresh33-harness.md` (H319)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H318 | H312 cross ↔ H313 billing | owner \| admin |
| H319 | dual-method cancel harness #33 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh324-01: cita H318 / H319 / owner|admin  
- CT-hh324-02: proíbe alterar ACL  
- CT-hh324-03: assert CI

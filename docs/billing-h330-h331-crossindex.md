# Cross-index — H330 H324↔H325 ↔ H331 dual-cancel harness (H336)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h324-h325-crossindex.md` (H330) · `docs/h326-dual-cancel-refresh35-harness.md` (H331)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H330 | H324 cross ↔ H325 billing | owner \| admin |
| H331 | dual-method cancel harness #35 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh336-01: cita H330 / H331 / owner|admin  
- CT-hh336-02: proíbe alterar ACL  
- CT-hh336-03: assert CI

# Cross-index — H348 H342↔H343 ↔ H349 dual-cancel harness (H354)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h342-h343-crossindex.md` (H348) · `docs/h344-dual-cancel-refresh38-harness.md` (H349)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H348 | H342 cross ↔ H343 billing | owner \| admin |
| H349 | dual-method cancel harness #38 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh354-01: cita H348 / H349 / owner|admin  
- CT-hh354-02: proíbe alterar ACL  
- CT-hh354-03: assert CI

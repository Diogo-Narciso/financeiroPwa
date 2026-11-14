# Cross-index — H228 H222↔H223 ↔ H229 dual-cancel harness (H234)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h222-h223-crossindex.md` (H228) · `docs/h224-dual-cancel-refresh18-harness.md` (H229)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H228 | H222 cross ↔ H223 billing | owner \| admin |
| H229 | dual-method cancel harness #18 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh234-01: cita H228 / H229 / owner|admin  
- CT-hh234-02: proíbe alterar ACL  
- CT-hh234-03: assert CI

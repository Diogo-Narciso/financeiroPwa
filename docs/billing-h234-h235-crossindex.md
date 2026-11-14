# Cross-index — H234 H228↔H229 ↔ H235 dual-cancel harness (H240)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h228-h229-crossindex.md` (H234) · `docs/h230-dual-cancel-refresh19-harness.md` (H235)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H234 | H228 cross ↔ H229 billing | owner \| admin |
| H235 | dual-method cancel harness #19 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh240-01: cita H234 / H235 / owner|admin  
- CT-hh240-02: proíbe alterar ACL  
- CT-hh240-03: assert CI

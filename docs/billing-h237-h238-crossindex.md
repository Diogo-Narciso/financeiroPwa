# Cross-index — H237 H231↔H232 ↔ H238 sub POST vs cancel refresh #18 (H243)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h231-h232-crossindex.md` (H237) · `docs/billing-sub-post-cancel-refresh18.md` (H238)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H237 | H231 cross ↔ H232 billing | owner \| admin |
| H238 | subscription POST vs cancel refresh #18 | owner \| admin |

## Achado

Cross-index e refresh sub/cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh243-01: cita H237 / H238 / owner|admin  
- CT-hh243-02: proíbe alterar ACL  
- CT-hh243-03: assert CI

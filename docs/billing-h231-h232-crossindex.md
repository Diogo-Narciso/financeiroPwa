# Cross-index — H231 H225↔H226 ↔ H232 sub POST vs cancel refresh #17 (H237)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h225-h226-crossindex.md` (H231) · `docs/billing-sub-post-cancel-refresh17.md` (H232)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H231 | H225 cross ↔ H226 billing | owner \| admin |
| H232 | subscription POST vs cancel refresh #17 | owner \| admin |

## Achado

Cross-index e refresh sub/cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh237-01: cita H231 / H232 / owner|admin  
- CT-hh237-02: proíbe alterar ACL  
- CT-hh237-03: assert CI

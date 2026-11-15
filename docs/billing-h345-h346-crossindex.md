# Cross-index — H345 H339↔H340 ↔ H346 sub-cancel refresh #36 (H351)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h339-h340-crossindex.md` (H345) · `docs/billing-sub-post-cancel-refresh36.md` (H346)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H345 | H339 cross ↔ H340 billing | owner \| admin |
| H346 | subscription POST vs cancel #36 | owner \| admin |

## Achado

Cross-index e refresh sub-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh351-01: cita H345 / H346 / owner|admin  
- CT-hh351-02: proíbe alterar ACL  
- CT-hh351-03: assert CI

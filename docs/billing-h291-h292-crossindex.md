# Cross-index — H291 H285↔H286 ↔ H292 sub-cancel refresh #27 (H297)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h285-h286-crossindex.md` (H291) · `docs/billing-sub-post-cancel-refresh27.md` (H292)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H291 | H285 cross ↔ H286 billing | owner \| admin |
| H292 | subscription POST vs cancel #27 | owner \| admin |

## Achado

Cross-index e refresh sub-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh297-01: cita H291 / H292 / owner|admin  
- CT-hh297-02: proíbe alterar ACL  
- CT-hh297-03: assert CI

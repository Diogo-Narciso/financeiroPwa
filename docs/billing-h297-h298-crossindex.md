# Cross-index — H297 H291↔H292 ↔ H298 sub-cancel refresh #28 (H303)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h291-h292-crossindex.md` (H297) · `docs/billing-sub-post-cancel-refresh28.md` (H298)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H297 | H291 cross ↔ H292 billing | owner \| admin |
| H298 | subscription POST vs cancel #28 | owner \| admin |

## Achado

Cross-index e refresh sub-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh303-01: cita H297 / H298 / owner|admin  
- CT-hh303-02: proíbe alterar ACL  
- CT-hh303-03: assert CI

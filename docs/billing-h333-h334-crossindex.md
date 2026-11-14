# Cross-index — H333 H327↔H328 ↔ H334 sub-cancel refresh #34 (H339)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h327-h328-crossindex.md` (H333) · `docs/billing-sub-post-cancel-refresh34.md` (H334)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H333 | H327 cross ↔ H328 billing | owner \| admin |
| H334 | subscription POST vs cancel #34 | owner \| admin |

## Achado

Cross-index e refresh sub-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh339-01: cita H333 / H334 / owner|admin  
- CT-hh339-02: proíbe alterar ACL  
- CT-hh339-03: assert CI

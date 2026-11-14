# Cross-index — H339 H333↔H334 ↔ H340 sub-cancel refresh #35 (H345)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h333-h334-crossindex.md` (H339) · `docs/billing-sub-post-cancel-refresh35.md` (H340)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H339 | H333 cross ↔ H334 billing | owner \| admin |
| H340 | subscription POST vs cancel #35 | owner \| admin |

## Achado

Cross-index e refresh sub-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh345-01: cita H339 / H340 / owner|admin  
- CT-hh345-02: proíbe alterar ACL  
- CT-hh345-03: assert CI

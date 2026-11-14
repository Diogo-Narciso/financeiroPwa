# Cross-index — H285 H279↔H280 ↔ H286 sub-cancel refresh #26 (H291)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h279-h280-crossindex.md` (H285) · `docs/billing-sub-post-cancel-refresh26.md` (H286)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H285 | H279 cross ↔ H280 billing | owner \| admin |
| H286 | subscription POST vs cancel #26 | owner \| admin |

## Achado

Cross-index e refresh sub-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh291-01: cita H285 / H286 / owner|admin  
- CT-hh291-02: proíbe alterar ACL  
- CT-hh291-03: assert CI

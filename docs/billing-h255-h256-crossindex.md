# Cross-index — H255 H249↔H250 ↔ H256 sub POST vs cancel refresh #21 (H261)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h249-h250-crossindex.md` (H255) · `docs/billing-sub-post-cancel-refresh21.md` (H256)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H255 | H249 cross ↔ H250 billing | owner \| admin |
| H256 | subscription POST vs cancel refresh #21 | owner \| admin |

## Achado

Cross-index e refresh sub/cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh261-01: cita H255 / H256 / owner|admin  
- CT-hh261-02: proíbe alterar ACL  
- CT-hh261-03: assert CI

# Cross-index — H261 H255↔H256 ↔ H262 sub POST vs cancel refresh #22 (H267)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h255-h256-crossindex.md` (H261) · `docs/billing-sub-post-cancel-refresh22.md` (H262)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H261 | H255 cross ↔ H256 billing | owner \| admin |
| H262 | subscription POST vs cancel refresh #22 | owner \| admin |

## Achado

Cross-index e refresh sub/cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh267-01: cita H261 / H262 / owner|admin  
- CT-hh267-02: proíbe alterar ACL  
- CT-hh267-03: assert CI

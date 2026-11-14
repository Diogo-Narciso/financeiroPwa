# Cross-index — H249 H243↔H244 ↔ H250 sub POST vs cancel refresh #20 (H255)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h243-h244-crossindex.md` (H249) · `docs/billing-sub-post-cancel-refresh20.md` (H250)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H249 | H243 cross ↔ H244 billing | owner \| admin |
| H250 | subscription POST vs cancel refresh #20 | owner \| admin |

## Achado

Cross-index e refresh sub/cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh255-01: cita H249 / H250 / owner|admin  
- CT-hh255-02: proíbe alterar ACL  
- CT-hh255-03: assert CI

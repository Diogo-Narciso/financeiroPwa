# Cross-index — H303 H297↔H298 ↔ H304 sub-cancel refresh #29 (H309)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h297-h298-crossindex.md` (H303) · `docs/billing-sub-post-cancel-refresh29.md` (H304)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H303 | H297 cross ↔ H298 billing | owner \| admin |
| H304 | subscription POST vs cancel #29 | owner \| admin |

## Achado

Cross-index e refresh sub-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh309-01: cita H303 / H304 / owner|admin  
- CT-hh309-02: proíbe alterar ACL  
- CT-hh309-03: assert CI

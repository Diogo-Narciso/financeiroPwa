# Cross-index — H309 H303↔H304 ↔ H310 sub-cancel refresh #30 (H315)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h303-h304-crossindex.md` (H309) · `docs/billing-sub-post-cancel-refresh30.md` (H310)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H309 | H303 cross ↔ H304 billing | owner \| admin |
| H310 | subscription POST vs cancel #30 | owner \| admin |

## Achado

Cross-index e refresh sub-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh315-01: cita H309 / H310 / owner|admin  
- CT-hh315-02: proíbe alterar ACL  
- CT-hh315-03: assert CI

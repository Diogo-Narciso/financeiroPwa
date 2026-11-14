# Cross-index — H315 H309↔H310 ↔ H316 sub-cancel refresh #31 (H321)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h309-h310-crossindex.md` (H315) · `docs/billing-sub-post-cancel-refresh31.md` (H316)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H315 | H309 cross ↔ H310 billing | owner \| admin |
| H316 | subscription POST vs cancel #31 | owner \| admin |

## Achado

Cross-index e refresh sub-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh321-01: cita H315 / H316 / owner|admin  
- CT-hh321-02: proíbe alterar ACL  
- CT-hh321-03: assert CI

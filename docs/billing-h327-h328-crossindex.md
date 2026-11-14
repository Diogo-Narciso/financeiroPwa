# Cross-index — H327 H321↔H322 ↔ H328 sub-cancel refresh #33 (H333)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h321-h322-crossindex.md` (H327) · `docs/billing-sub-post-cancel-refresh33.md` (H328)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H327 | H321 cross ↔ H322 billing | owner \| admin |
| H328 | subscription POST vs cancel #33 | owner \| admin |

## Achado

Cross-index e refresh sub-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh333-01: cita H327 / H328 / owner|admin  
- CT-hh333-02: proíbe alterar ACL  
- CT-hh333-03: assert CI

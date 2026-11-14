# Cross-index — H321 H315↔H316 ↔ H322 sub-cancel refresh #32 (H327)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h315-h316-crossindex.md` (H321) · `docs/billing-sub-post-cancel-refresh32.md` (H322)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H321 | H315 cross ↔ H316 billing | owner \| admin |
| H322 | subscription POST vs cancel #32 | owner \| admin |

## Achado

Cross-index e refresh sub-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh327-01: cita H321 / H322 / owner|admin  
- CT-hh327-02: proíbe alterar ACL  
- CT-hh327-03: assert CI

# Cross-index — H279 H273↔H274 ↔ H280 sub-cancel refresh #25 (H285)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h273-h274-crossindex.md` (H279) · `docs/billing-sub-post-cancel-refresh25.md` (H280)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H279 | H273 cross ↔ H274 billing | owner \| admin |
| H280 | subscription POST vs cancel #25 | owner \| admin |

## Achado

Cross-index e refresh sub-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh285-01: cita H279 / H280 / owner|admin  
- CT-hh285-02: proíbe alterar ACL  
- CT-hh285-03: assert CI

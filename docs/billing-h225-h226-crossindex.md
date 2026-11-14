# Cross-index — H225 H219↔H220 ↔ H226 sub POST vs cancel refresh #16 (H231)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h219-h220-crossindex.md` (H225) · `docs/billing-sub-post-cancel-refresh16.md` (H226)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H225 | H219 cross ↔ H220 billing | owner \| admin |
| H226 | subscription POST vs cancel refresh #16 | owner \| admin |

## Achado

Cross-index e refresh sub/cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh231-01: cita H225 / H226 / owner|admin  
- CT-hh231-02: proíbe alterar ACL  
- CT-hh231-03: assert CI

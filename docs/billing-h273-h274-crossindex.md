# Cross-index — H273 H267↔H268 ↔ H274 sub-cancel refresh #24 (H279)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h267-h268-crossindex.md` (H273) · `docs/billing-sub-post-cancel-refresh24.md` (H274)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H273 | H267 cross ↔ H268 billing | owner \| admin |
| H274 | subscription POST vs cancel #24 | owner \| admin |

## Achado

Cross-index e refresh sub-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh279-01: cita H273 / H274 / owner|admin  
- CT-hh279-02: proíbe alterar ACL  
- CT-hh279-03: assert CI

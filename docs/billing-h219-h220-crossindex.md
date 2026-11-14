# Cross-index — H219 H212↔H213 ↔ H220 sub POST vs cancel refresh #15 (H225)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h212-h213-crossindex.md` (H219) · `docs/billing-sub-post-cancel-refresh15.md` (H220)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H219 | H212 cross ↔ H213 billing | owner \| admin |
| H220 | subscription POST vs cancel refresh #15 | owner \| admin |

## Achado

Cross-index e refresh sub/cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh225-01: cita H219 / H220 / owner|admin  
- CT-hh225-02: proíbe alterar ACL  
- CT-hh225-03: assert CI

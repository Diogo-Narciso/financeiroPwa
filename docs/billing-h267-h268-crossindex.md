# Cross-index — H267 H261↔H262 ↔ H268 sub POST vs cancel refresh #23 (H273)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h261-h262-crossindex.md` (H267) · `docs/billing-sub-post-cancel-refresh23.md` (H268)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H267 | H261 cross ↔ H262 billing | owner \| admin |
| H268 | subscription POST vs cancel refresh #23 | owner \| admin |

## Achado

Cross-index e refresh sub/cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh273-01: cita H267 / H268 / owner|admin  
- CT-hh273-02: proíbe alterar ACL  
- CT-hh273-03: assert CI

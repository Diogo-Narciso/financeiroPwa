# Cross-index — H123 mutations/dual ↔ H125 sub POST↔plans harness (H129)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h117-h118-crossindex.md` (H123) · `docs/h125-sub-post-plans-get-harness.md` (H125)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H123 | H117 mutations ↔ H118 dual/cancel | owner \| admin |
| H125 | subscription POST ↔ plans GET harness | owner \| admin |

## Achado

Cross-index e harness de POST/GET convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh-01: cita H123 / H125 / owner|admin  
- CT-hh-02: proíbe alterar ACL  
- CT-hh-03: assert CI

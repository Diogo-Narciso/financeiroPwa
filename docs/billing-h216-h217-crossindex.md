# Cross-index — H216 H210↔H211 ↔ H217 cancel↔plans harness (H222)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h210-h211-crossindex.md` (H216) · `docs/h212-cancel-plans-refresh14-harness.md` (H217)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H216 | H210 cross ↔ H211 billing | owner \| admin |
| H217 | cancel POST ↔ plans GET harness #14 | owner \| admin |

## Achado

Cross-index e harness cancel/plans convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh222-01: cita H216 / H217 / owner|admin  
- CT-hh222-02: proíbe alterar ACL  
- CT-hh222-03: assert CI

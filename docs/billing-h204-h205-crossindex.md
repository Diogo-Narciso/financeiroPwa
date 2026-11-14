# Cross-index — H204 H198↔H199 ↔ H205 cancel↔plans harness (H210)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h198-h199-crossindex.md` (H204) · `docs/h200-cancel-plans-refresh12-harness.md` (H205)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H204 | H198 cross ↔ H199 harness | owner \| admin |
| H205 | cancel POST ↔ plans GET refresh #12 harness | owner \| admin |

## Achado

Cross-index e harness cancel/plans convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh210-01: cita H204 / H205 / owner|admin  
- CT-hh210-02: proíbe alterar ACL  
- CT-hh210-03: assert CI

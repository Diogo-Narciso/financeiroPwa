# Cross-index — H198 H192↔H193 ↔ H199 cancel↔plans harness (H204)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h192-h193-crossindex.md` (H198) · `docs/h194-cancel-plans-refresh11-harness.md` (H199)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H198 | H192 cross ↔ H193 harness | owner \| admin |
| H199 | cancel POST ↔ plans GET refresh #11 harness | owner \| admin |

## Achado

Cross-index e harness cancel/plans convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh204-01: cita H198 / H199 / owner|admin  
- CT-hh204-02: proíbe alterar ACL  
- CT-hh204-03: assert CI

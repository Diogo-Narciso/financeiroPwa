# Cross-index — H192 H186↔H187 ↔ H193 cancel↔plans harness (H198)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h186-h187-crossindex.md` (H192) · `docs/h193-cancel-plans-refresh10-harness.md` (H193)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H192 | H186 cross ↔ H187 harness | owner \| admin |
| H193 | cancel POST ↔ plans GET refresh #10 harness | owner \| admin |

## Achado

Cross-index e harness cancel/plans convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh198-01: cita H192 / H193 / owner|admin  
- CT-hh198-02: proíbe alterar ACL  
- CT-hh198-03: assert CI

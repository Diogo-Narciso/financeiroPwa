# Cross-index — H186 H180↔H181 ↔ H187 cancel↔plans harness (H192)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h180-h181-crossindex.md` (H186) · `docs/h187-cancel-plans-refresh9-harness.md` (H187)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H186 | H180 cross ↔ H181 harness | owner \| admin |
| H187 | cancel POST ↔ plans GET refresh #9 harness | owner \| admin |

## Achado

Cross-index e harness cancel/plans convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh192-01: cita H186 / H187 / owner|admin  
- CT-hh192-02: proíbe alterar ACL  
- CT-hh192-03: assert CI

# Cross-index — H174 H168↔H169 ↔ H175 cancel↔plans harness (H180)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h168-h169-crossindex.md` (H174) · `docs/h175-cancel-plans-refresh7-harness.md` (H175)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H174 | H168 cross ↔ H169 harness | owner \| admin |
| H175 | cancel POST ↔ plans GET refresh #7 harness | owner \| admin |

## Achado

Cross-index e harness cancel/plans convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh180-01: cita H174 / H175 / owner|admin  
- CT-hh180-02: proíbe alterar ACL  
- CT-hh180-03: assert CI

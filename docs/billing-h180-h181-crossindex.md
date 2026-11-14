# Cross-index — H180 H174↔H175 ↔ H181 cancel↔plans harness (H186)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h174-h175-crossindex.md` (H180) · `docs/h181-cancel-plans-refresh8-harness.md` (H181)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H180 | H174 cross ↔ H175 harness | owner \| admin |
| H181 | cancel POST ↔ plans GET refresh #8 harness | owner \| admin |

## Achado

Cross-index e harness cancel/plans convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh186-01: cita H180 / H181 / owner|admin  
- CT-hh186-02: proíbe alterar ACL  
- CT-hh186-03: assert CI

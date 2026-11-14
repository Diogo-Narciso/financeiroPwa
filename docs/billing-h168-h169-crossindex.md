# Cross-index — H168 H162↔H163 ↔ H169 cancel↔plans harness (H174)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h162-h163-crossindex.md` (H168) · `docs/h169-cancel-plans-refresh6-harness.md` (H169)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H168 | H162 cross ↔ H163 harness | owner \| admin |
| H169 | cancel POST ↔ plans GET refresh #6 harness | owner \| admin |

## Achado

Cross-index e harness cancel/plans convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh174-01: cita H168 / H169 / owner|admin  
- CT-hh174-02: proíbe alterar ACL  
- CT-hh174-03: assert CI

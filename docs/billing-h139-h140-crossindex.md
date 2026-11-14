# Cross-index — H139 H134↔H133 ↔ H140 cancel↔plans harness (H144)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h134-h133-crossindex.md` (H139) · `docs/h140-cancel-plans-refresh2-harness.md` (H140)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H139 | H134 cross ↔ H133 harness | owner \| admin |
| H140 | cancel POST ↔ plans GET refresh #2 harness | owner \| admin |

## Achado

Cross-index e harness cancel/plans convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh-01: cita H139 / H140 / owner|admin  
- CT-hh-02: proíbe alterar ACL  
- CT-hh-03: assert CI

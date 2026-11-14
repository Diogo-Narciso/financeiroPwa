# Cross-index — H156 H150↔H151 ↔ H157 cancel↔plans harness (H162)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h150-h151-crossindex.md` (H156) · `docs/h157-cancel-plans-refresh4-harness.md` (H157)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H156 | H150 cross ↔ H151 harness | owner \| admin |
| H157 | cancel POST ↔ plans GET refresh #4 harness | owner \| admin |

## Achado

Cross-index e harness cancel/plans convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh162-01: cita H156 / H157 / owner|admin  
- CT-hh162-02: proíbe alterar ACL  
- CT-hh162-03: assert CI

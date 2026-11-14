# Cross-index — H162 H156↔H157 ↔ H163 cancel↔plans harness (H168)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h156-h157-crossindex.md` (H162) · `docs/h163-cancel-plans-refresh5-harness.md` (H163)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H162 | H156 cross ↔ H157 harness | owner \| admin |
| H163 | cancel POST ↔ plans GET refresh #5 harness | owner \| admin |

## Achado

Cross-index e harness cancel/plans convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh168-01: cita H162 / H163 / owner|admin  
- CT-hh168-02: proíbe alterar ACL  
- CT-hh168-03: assert CI

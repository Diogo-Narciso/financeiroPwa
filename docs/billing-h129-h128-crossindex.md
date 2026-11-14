# Cross-index — H129 H123↔H125 ↔ H128 cancel↔plans harness (H134)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h123-h125-crossindex.md` (H129) · `docs/h128-cancel-plans-refresh-harness.md` (H128)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H129 | H123 cross ↔ H125 harness | owner \| admin |
| H128 | cancel POST ↔ plans GET harness | owner \| admin |

## Achado

Cross-index e harness de cancel/plans convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh-01: cita H129 / H128 / owner|admin  
- CT-hh-02: proíbe alterar ACL  
- CT-hh-03: assert CI

# Cross-index — H210 H204↔H205 ↔ H211 cancel↔plans harness (H216)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h204-h205-crossindex.md` (H210) · `docs/h206-cancel-plans-refresh13-harness.md` (H211)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H210 | H204 cross ↔ H205 harness | owner \| admin |
| H211 | cancel POST ↔ plans GET refresh #13 harness | owner \| admin |

## Achado

Cross-index e harness cancel/plans convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh216-01: cita H210 / H211 / owner|admin  
- CT-hh216-02: proíbe alterar ACL  
- CT-hh216-03: assert CI

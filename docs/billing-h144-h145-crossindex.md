# Cross-index — H144 H139↔H140 ↔ H145 dual-cancel harness (H150)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h139-h140-crossindex.md` (H144) · `docs/h145-dual-cancel-refresh3-harness.md` (H145)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H144 | H139 cross ↔ H140 harness | owner \| admin |
| H145 | dual GET/POST cancel refresh #3 harness | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh150-01: cita H144 / H145 / owner|admin  
- CT-hh150-02: proíbe alterar ACL  
- CT-hh150-03: assert CI

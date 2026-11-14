# Cross-index — H270 H264↔H265 ↔ H271 dual-cancel harness (H276)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h264-h265-crossindex.md` (H270) · `docs/h266-dual-cancel-refresh25-harness.md` (H271)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H270 | H264 cross ↔ H265 billing | owner \| admin |
| H271 | dual-method cancel harness #25 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh276-01: cita H270 / H271 / owner|admin  
- CT-hh276-02: proíbe alterar ACL  
- CT-hh276-03: assert CI

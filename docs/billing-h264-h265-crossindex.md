# Cross-index — H264 H258↔H259 ↔ H265 dual-cancel harness (H270)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h258-h259-crossindex.md` (H264) · `docs/h260-dual-cancel-refresh24-harness.md` (H265)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H264 | H258 cross ↔ H259 billing | owner \| admin |
| H265 | dual-method cancel harness #24 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh270-01: cita H264 / H265 / owner|admin  
- CT-hh270-02: proíbe alterar ACL  
- CT-hh270-03: assert CI

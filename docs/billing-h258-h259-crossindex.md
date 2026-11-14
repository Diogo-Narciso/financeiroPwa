# Cross-index — H258 H252↔H253 ↔ H259 dual-cancel harness (H264)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h252-h253-crossindex.md` (H258) · `docs/h254-dual-cancel-refresh23-harness.md` (H259)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H258 | H252 cross ↔ H253 billing | owner \| admin |
| H259 | dual-method cancel harness #23 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh264-01: cita H258 / H259 / owner|admin  
- CT-hh264-02: proíbe alterar ACL  
- CT-hh264-03: assert CI

# Cross-index — H200 cancel↔plans refresh #12 ↔ H201 H194↔H195 (H207)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh12.md` (H200) · `docs/billing-h194-h195-crossindex.md` (H201)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H200 | cancel POST ↔ plans GET refresh #12 | owner \| admin |
| H201 | H194 cross ↔ H195 dual chain | owner \| admin |

## Achado

Refresh cancel/plans e cross-index convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh207-01: cita H200 / H201 / owner|admin  
- CT-hh207-02: proíbe alterar ACL  
- CT-hh207-03: assert CI

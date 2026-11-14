# Cross-index — H206 cancel↔plans refresh #13 ↔ H207 H200↔H201 (H213)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh13.md` (H206) · `docs/billing-h200-h201-crossindex.md` (H207)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H206 | cancel POST ↔ plans GET refresh #13 | owner \| admin |
| H207 | H200 cross ↔ H201 billing | owner \| admin |

## Achado

Refresh cancel/plans e cross-index convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh213-01: cita H206 / H207 / owner|admin  
- CT-hh213-02: proíbe alterar ACL  
- CT-hh213-03: assert CI

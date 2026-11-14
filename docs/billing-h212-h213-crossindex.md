# Cross-index — H212 cancel↔plans refresh #14 ↔ H213 H206↔H207 (H219)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh14.md` (H212) · `docs/billing-h206-h207-crossindex.md` (H213)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H212 | cancel POST ↔ plans GET refresh #14 | owner \| admin |
| H213 | H206 cross ↔ H207 billing | owner \| admin |

## Achado

Refresh cancel/plans e cross-index convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh219-01: cita H212 / H213 / owner|admin  
- CT-hh219-02: proíbe alterar ACL  
- CT-hh219-03: assert CI

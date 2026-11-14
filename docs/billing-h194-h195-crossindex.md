# Cross-index — H194 cancel↔plans refresh #11 ↔ H195 dual chain index (H201)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-refresh11.md` (H194) · `docs/h189-h183-dual-chain-index.md` (H195)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H194 | cancel POST ↔ plans GET refresh #11 | owner \| admin |
| H195 | H189 ↔ H183 dual chain index | owner \| admin (AS-IS) |

## Achado

Refresh cancel/plans e índice dual chain convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh201-01: cita H194 / H195 / owner|admin  
- CT-hh201-02: proíbe alterar ACL  
- CT-hh201-03: assert CI

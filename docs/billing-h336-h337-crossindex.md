# Cross-index — H336 H330↔H331 ↔ H337 dual-cancel harness (H342)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h330-h331-crossindex.md` (H336) · `docs/h332-dual-cancel-refresh36-harness.md` (H337)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H336 | H330 cross ↔ H331 billing | owner \| admin |
| H337 | dual-method cancel harness #36 | owner \| admin |

## Achado

Cross-index e harness dual-cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh342-01: cita H336 / H337 / owner|admin  
- CT-hh342-02: proíbe alterar ACL  
- CT-hh342-03: assert CI

# Cross-index — H222 H216↔H217 ↔ H223 cancel↔plans harness (H228)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h216-h217-crossindex.md` (H222) · `docs/h218-cancel-plans-refresh15-harness.md` (H223)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H222 | H216 cross ↔ H217 billing | owner \| admin |
| H223 | cancel POST ↔ plans GET harness #15 | owner \| admin |

## Achado

Cross-index e harness cancel/plans convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh228-01: cita H222 / H223 / owner|admin  
- CT-hh228-02: proíbe alterar ACL  
- CT-hh228-03: assert CI

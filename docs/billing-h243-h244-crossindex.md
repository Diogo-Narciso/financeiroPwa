# Cross-index — H243 H237↔H238 ↔ H244 sub POST vs cancel refresh #19 (H249)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h237-h238-crossindex.md` (H243) · `docs/billing-sub-post-cancel-refresh19.md` (H244)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H243 | H237 cross ↔ H238 billing | owner \| admin |
| H244 | subscription POST vs cancel refresh #19 | owner \| admin |

## Achado

Cross-index e refresh sub/cancel convergem sem alterar ACL; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh249-01: cita H243 / H244 / owner|admin  
- CT-hh249-02: proíbe alterar ACL  
- CT-hh249-03: assert CI

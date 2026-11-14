# Cross-index — H117 mutations ↔ H118 dual vs cancel (H123)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-mutations-crossindex.md` (H117) · `docs/billing-dual-method-cancel-note.md` (H118)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H117 | GET aligns ↔ POST mutations | owner \| admin |
| H118 | dual GET/POST subscription vs cancel | owner \| admin |

## Achado

Mutations e dual-method notes convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh-01: cita H117 / H118 / owner|admin  
- CT-hh-02: proíbe alterar ACL  
- CT-hh-03: assert CI

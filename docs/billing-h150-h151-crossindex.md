# Cross-index — H150 H144↔H145 ↔ H151 cancel↔plans harness (H156)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-h144-h145-crossindex.md` (H150) · `docs/h151-cancel-plans-refresh3-harness.md` (H151)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H150 | H144 cross ↔ H145 harness | owner \| admin |
| H151 | cancel POST ↔ plans GET refresh #3 harness | owner \| admin |

## Achado

Cross-index e harness cancel/plans convergem no mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-hh156-01: cita H150 / H151 / owner|admin  
- CT-hh156-02: proíbe alterar ACL  
- CT-hh156-03: assert CI

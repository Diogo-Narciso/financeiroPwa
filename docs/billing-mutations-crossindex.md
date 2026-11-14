# Cross-index — H111 GET aligns ↔ H112 POST mutations (H117)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-get-align-crossindex.md` (H111) · `docs/billing-subscription-post-cancel-align.md` (H112)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H111 | GET aligns (plans/subscription + H105) | owner \| admin |
| H112 | POST mutations (subscription/cancel) | owner \| admin |

## Achado

Leituras e mutações billing compartilham o mesmo draft; E-R01 AS-IS permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-bm-01: cita H111 / H112 / owner|admin  
- CT-bm-02: proíbe alterar ACL  
- CT-bm-03: assert CI

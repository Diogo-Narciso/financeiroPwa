# Harness — subscription POST ↔ cancel POST align (H116 / H112 · H89 · H92)

**Status:** harness de cobertura do align H112 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-subscription-post-cancel-align.md` (H112) · proposals H89 / H92

## Cobertura

| Item | Esperado |
|---|---|
| H112 align | subscription POST e cancel POST → owner \| admin |
| H89 / H92 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u116-01: doc cita H112 / H89 / H92  
- CT-u116-02: proposals existem; routes sem matches*  
- CT-u116-03: assert CI

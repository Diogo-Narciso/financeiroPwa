# Harness — dual-method vs cancel note (H122 / H118 · H89 · H92)

**Status:** harness de cobertura da nota H118 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-dual-method-cancel-note.md` (H118) · proposals H89 / H92

## Cobertura

| Item | Esperado |
|---|---|
| H118 note | subscription GET\|POST e cancel POST → owner \| admin |
| H89 / H92 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u122-01: doc cita H118 / H89 / H92  
- CT-u122-02: proposals existem; routes sem matches*  
- CT-u122-03: assert CI

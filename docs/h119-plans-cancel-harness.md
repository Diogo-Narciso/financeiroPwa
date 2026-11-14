# Harness — plans GET vs cancel POST (H119 / H115 · H86 · H92)

**Status:** harness de cobertura do cross H115 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-plans-get-cancel-cross.md` (H115) · proposals H86 / H92

## Cobertura

| Item | Esperado |
|---|---|
| H115 cross | plans GET e cancel POST → owner \| admin |
| H86 / H92 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não inventar owner-only / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-u119-01: doc cita H115 / H86 / H92  
- CT-u119-02: proposals existem; routes sem matches*  
- CT-u119-03: assert CI

# Harness — cancel↔plans method note (H113 / H109 · H104 · H100)

**Status:** harness de cobertura da nota H109 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-method-note.md` (H109) · `docs/h104-cancel-plans-align-harness.md` · proposals H86/H92

## Cobertura

| Item | Esperado |
|---|---|
| H109 note | plans GET e cancel POST → owner \| admin |
| H86 / H92 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não inventar owner-only / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-u113-01: doc cita H109 / H86 / H92  
- CT-u113-02: proposals existem; routes sem matches*  
- CT-u113-03: assert CI

# Harness — plans GET ↔ subscription GET align (H110 / H106 · H86 · H89)

**Status:** harness de cobertura do align H106 · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-plans-subscription-get-align.md` (H106) · proposals H86 / H89

## Cobertura

| Item | Esperado |
|---|---|
| H106 align | plans GET e subscription GET → owner \| admin |
| H86 / H89 | proposals existem |
| Routes | **sem** import dos helpers |

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u110-01: doc cita H106 / H86 / H89  
- CT-u110-02: proposals existem; routes sem matches*  
- CT-u110-03: assert CI

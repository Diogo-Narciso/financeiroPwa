# Cross-index — H105 billing roles ↔ H106 plans/subscription GET (H111)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-roles-align-crossindex.md` (H105) · `docs/billing-plans-subscription-get-align.md` (H106)

## Comparativo

| Doc | Foco | Draft |
|---|---|---|
| H105 | cancel↔subscription ↔ cancel↔plans | owner \| admin |
| H106 | plans GET ↔ subscription GET | owner \| admin |

## Achado

Leituras (GET) e o conjunto billing (plans/subscription/cancel) convergem no mesmo draft.  
AS-IS AUTH sem role array (E-R01) permanece.

## Proibições

- Não editar routes neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-bg-01: cita H105 / H106 / owner|admin  
- CT-bg-02: proíbe alterar ACL  
- CT-bg-03: assert CI

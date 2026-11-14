# Cross-index — H96 cancel↔subscription ↔ H100 cancel↔plans (H105)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-subscription-roles-align.md` (H96) · `docs/billing-cancel-plans-roles-align.md` (H100)

## Comparativo

| Align | Paths | Roles draft |
|---|---|---|
| H96 | cancel ↔ subscription | owner \| admin |
| H100 | cancel ↔ plans | owner \| admin |

## Achado

Billing proposals (plans / subscription / cancel) convergem no mesmo draft `owner | admin`.  
AS-IS AUTH sem role array permanece (E-R01).

## Proibições

- Não editar routes neste PR.
- Não inventar owner-only / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-br-01: cita H96 / H100 / owner|admin  
- CT-br-02: proíbe alterar ACL  
- CT-br-03: assert CI

# Glossário — endpoints AUTH sem role array (H81 / E-R01)

**Status:** glossário · **não** altera ACL · **não** fecha E-R01 / G-R01  
**Fontes:** H43 inventário · H55/H67/H76 índices · specs H68/H71/H74/H78

## Termos

| Termo | Significado |
|---|---|
| `E-R01` | Gap: endpoint com `requireUser` sem array de roles explícito |
| `AUTH` | Sessão obrigatória; sem gate de role |
| `ROLE` | Handler com roles / `canAccess*` |
| `role proposal` | Draft const+matcher; route permanece AUTH |
| `G-R01` | Gap matriz roles global — aberto |

## Endpoints AUTH (amostra documentada)

| Path | Método | Spec/índice |
|---|---|---|
| `companies/[id]` | GET | H55 |
| `invoices` | GET | H78 |
| `quotas` | GET | H74 |
| `quotas/.../reserve` | POST | H71 |
| `imports/[id]` | GET | H68 |
| `billing/plans|subscription|cancel` | * | H76 |

## Proibições

- Não editar routes neste PR.
- Não fechar E-R01/G-R01.
- Não inventar roles.

## CTs

- CT-eg-01: cita E-R01 / AUTH / invoices|quotas|billing  
- CT-eg-02: proíbe fechar E-R01  
- CT-eg-03: assert CI

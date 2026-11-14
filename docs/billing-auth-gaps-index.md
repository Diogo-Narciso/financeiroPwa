# Índice — billing AUTH gaps (H76 / E-R01 resto)

**Status:** inventário pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** H43 · H67 · `apps/web/src/app/api/billing/**`

## Escopo

| Path | Métodos | Tag |
|---|---|---|
| `billing/plans` | GET | AUTH (`requireUser` sem role array) |
| `billing/subscription` | GET/POST | AUTH |
| `billing/cancel` | POST | AUTH |
| `billing/webhook/mock` | POST | **sem** `requireUser` (mock webhook) |

Tenant isolation via sessão/`tenant_id` nas mutations permanece (H17).

## Achado

| ID | Nota | Pri |
|---|---|---|
| E-R01 | billing plans/subscription/cancel AUTH sem role array | P2 |
| E-B01 | webhook/mock sem AUTH de sessão (esperado mock) | P3 |

## Proibições

- Não editar handlers billing neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-ba-01: cita billing / AUTH / E-R01  
- CT-ba-02: proíbe alterar ACL  
- CT-ba-03: assert CI

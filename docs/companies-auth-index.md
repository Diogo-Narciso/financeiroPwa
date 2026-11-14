# Índice — `companies/[id]` AUTH-only (H55 / E-R01)

**Status:** inventário pontual · **não** altera ACL · **não** fecha G-R01 / E-R01  
**Fontes:** H43 inventário · `apps/web/src/app/api/companies/[id]/**`

## Escopo

Handlers sob `companies/[id]` que hoje são **AUTH** (sessão) sem array de roles no route:

| Path | Métodos | Tag |
|---|---|---|
| `companies/[id]` | GET, PATCH | AUTH |
| `companies/[id]/activity-profile` | (handlers existentes) | AUTH |
| `companies/[id]/tax-profile` | (handlers existentes) | AUTH |

Tenant isolation via `tenant_id` na query permanece (H17).

## Achado

| ID | Nota | Pri |
|---|---|---|
| E-R01 | Mutadores AUTH sem role array em `companies/[id]*` | P2 |

## Fora de escopo

- Inventar roles para PATCH/GET nestes handlers.
- Fechar E-R02/E-R03 (já tratados em H48/H49).
- Fechar G-R01.

## CTs

- CT-ca-01: cita E-R01 / companies/[id] / AUTH  
- CT-ca-02: proíbe alterar ACL neste cartão  
- CT-ca-03: assert CI

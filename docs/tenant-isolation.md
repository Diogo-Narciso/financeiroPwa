# Isolamento de tenant / anti-IDOR (H17)

**Status:** guard app-layer + testes · **não** substitui RLS Postgres (gap G2)  
**Código:** `apps/web/src/server/tenant-guard.ts`

## Contrato

| Função | Comportamento |
|---|---|
| `sameTenant(session, resource)` | igualdade estrita; null/vazio → false |
| `assertTenantResource(session, row)` | devolve row ou `TenantIsolationError` **404** (sem vazar existência) |
| `filterByTenant(session, rows)` | filtra lista |

## Uso

Handlers que carregam entidade por id devem:

1. Resolver sessão (`requireUser` → `tenantId`)
2. Buscar com `AND tenant_id = $session` **ou** passar o row por `assertTenantResource`
3. Mapear `TenantIsolationError` → 404 no HTTP

## Fora de escopo H17

- RLS nas migrações
- Testes e2e multi-browser
- Enumeração de todos os endpoints (follow-up)

## CTs

- CT-t01: sameTenant true/false
- CT-t02: cross-tenant → 404
- CT-t03: filterByTenant

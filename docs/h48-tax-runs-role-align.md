# Alinhamento — role em `GET /api/tax-runs/[id]` (H48 / E-R02)

**Status:** correção ACL pontual · **não** fecha G-R01 inteiro  
**Código:** `apps/web/src/app/api/tax-runs/[id]/route.ts`

## Mudança

`GET /api/tax-runs/[id]` passa a exigir as mesmas roles que `POST /api/tax-runs`:  
`owner` | `admin` | `analyst` | `reviewer` → senão **403**.

Tenant isolation (H17) permanece via `getTaxRun({ tenantId })`.

## Fora de escopo

- H49 exports download  
- Matriz centralizada de roles (G-R01)

## CTs

- CT-tr-01: doc cita E-R02 / roles alinhadas  
- CT-tr-02: route contém array owner/admin/analyst/reviewer  
- CT-tr-03: assert CI

# Alinhamento — role em `GET /api/exports/[id]/download` (H49 / E-R03)

**Status:** correção ACL pontual · **não** fecha G-R01  
**Código:** `apps/web/src/app/api/exports/[id]/download/route.ts`

## Mudança

Download exige as mesmas roles que `POST /api/exports`:  
`owner` | `admin` | `reviewer` | `analyst` → senão **403**.

Tenant isolation via `readExportZip({ tenantId })` permanece.

## CTs

- CT-ex-01: cita E-R03 / roles alinhadas  
- CT-ex-02: route contém array owner/admin/reviewer/analyst + 403  
- CT-ex-03: assert CI

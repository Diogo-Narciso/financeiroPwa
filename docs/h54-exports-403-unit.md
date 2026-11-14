# Unit — gate 403 `exports/[id]/download` (H54 / H49 E-R03)

**Status:** teste unitário do helper de role · **não** fecha G-R01  
**Código:** `apps/web/src/server/export-download-role-gate.ts` (+ `.test.ts`)  
**Uso:** `GET /api/exports/[id]/download` via `canAccessExportDownload`

## Cobertura

- Roles permitidas: owner | admin | reviewer | analyst → true  
- Outras roles / vazio → false (equivalente a **403** no handler)

## Proibições

- Não inventar roles além do alinhamento H49.
- Não remover tenant isolation (H17).

## CTs

- CT-u54-01: doc cita H49 / E-R03 / 403  
- CT-u54-02: test:unit web inclui `export-download-role-gate.test.ts`  
- CT-u54-03: assert CI

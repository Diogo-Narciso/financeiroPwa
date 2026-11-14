# Unit — gate 403 `tax-runs/[id]` (H53 / H48 E-R02)

**Status:** teste unitário do helper de role · **não** fecha G-R01  
**Código:** `apps/web/src/server/tax-run-role-gate.ts` (+ `.test.ts`)  
**Uso:** `GET /api/tax-runs/[id]` via `canAccessTaxRun`

## Cobertura

- Roles permitidas: owner | admin | analyst | reviewer → true  
- Outras roles / vazio → false (equivalente a **403** no handler)

## Proibições

- Não inventar roles além do alinhamento H48.
- Não remover tenant isolation (H17).

## CTs

- CT-u53-01: doc cita H48 / E-R02 / 403  
- CT-u53-02: test:unit web inclui `tax-run-role-gate.test.ts`  
- CT-u53-03: assert CI

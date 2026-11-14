# Shared helper — POST `tax-runs` role gate (H58 / H53)

**Status:** alinha POST create ao helper H53 · **não** fecha G-R01  
**Código:** `canAccessTaxRun` em `tax-run-role-gate.ts` · `POST /api/tax-runs`

## Mudança

`POST /api/tax-runs` passa a usar `canAccessTaxRun(user.role)` (mesmas roles H48/H53).

## Proibições

- Não inventar roles.
- Não remover tenant isolation.

## CTs

- CT-u58-01: doc cita H53 / canAccessTaxRun  
- CT-u58-02: route POST importa helper  
- CT-u58-03: assert CI

# Shared helper — POST `exports` role gate (H62 / H54)

**Status:** alinha POST create ao helper H54 · **não** fecha G-R01  
**Código:** `canAccessExportDownload` · `POST /api/exports`

## Mudança

`POST /api/exports` passa a usar `canAccessExportDownload(user.role)` (mesmas roles H49/H54).

## Proibições

- Não inventar roles.
- Não remover tenant isolation.

## CTs

- CT-u62-01: doc cita H54 / canAccessExportDownload  
- CT-u62-02: route POST importa helper  
- CT-u62-03: assert CI

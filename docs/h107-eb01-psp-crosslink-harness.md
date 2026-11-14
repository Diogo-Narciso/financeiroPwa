# Harness — E-B01 ↔ PSP crosslink (H107 / H102 · H97 · H34)

**Status:** harness de cobertura do crosslink H102 · **não** altera ACL · **não** fecha E-B01 / P11  
**Fontes:** `docs/eb01-psp-gaps-crosslink.md` (H102) · `docs/eb01-ops-notes.md` · `docs/psp-live-gaps.md`

## Cobertura

| Item | Esperado |
|---|---|
| H102 crosslink | E-B01 ≠ G-P11 |
| H97 ops | mock fora de produção |
| H34 PSP | gaps G-P11 abertos |
| webhook/mock | **sem** requireUser |

## Proibições

- Não editar handlers / adapters.
- Não commitar chaves / fechar P11 ou E-B01.

## CTs

- CT-u107-01: doc cita H102 / H97 / H34  
- CT-u107-02: docs existem; mock sem requireUser  
- CT-u107-03: assert CI

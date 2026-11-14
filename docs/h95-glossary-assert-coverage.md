# Cobertura — asserts dos glossários role helpers (H95 / H73 · H87)

**Status:** checklist de cobertura CI · **não** altera ACL  
**Fontes:** `scripts/h73-canaccess-glossary-assert.mjs` · `scripts/h87-role-proposal-glossary-assert.mjs`

## Cobertura esperada

| Assert | Doc | Em `test:unit` |
|---|---|---|
| H73 | `canaccess-helpers-glossary.md` | sim |
| H87 | `role-proposal-helpers-glossary.md` | sim |

## Proibições

- Não remover asserts existentes.
- Não fechar E-R01/G-R01.
- Não wire proposals.

## CTs

- CT-gc-01: cita H73 / H87 / test:unit  
- CT-gc-02: proíbe remover asserts / fechar gaps  
- CT-gc-03: assert CI

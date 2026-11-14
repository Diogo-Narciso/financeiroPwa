# Índice — H108 dual-glossary ↔ H98 dual-method harness (H114)

**Status:** índice pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/dual-glossary-h89-index.md` (H108) · `docs/h98-dual-method-harness.md` (H98)

## Ligação

| Peça | Nota |
|---|---|
| H98 | harness dual GET/POST reusa H89 |
| H108 | índice glossário ↔ helper H89 |
| H103 | dual-method ↔ role-proposal glossary |

## Achado

Cadeia H98 → H103 → H108 aponta para o mesmo helper H89 sem wire na route.

## Proibições

- Não importar helper na route.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-hh-01: cita H108 / H98 / H89  
- CT-hh-02: proíbe wire  
- CT-hh-03: assert CI

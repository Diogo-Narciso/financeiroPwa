# Índice — H137 dual chain ↔ H131 dual chain (H142)

**Status:** índice pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/h131-h126-dual-chain-index.md` (H137) · `docs/h126-h120-dual-chain-index.md` (H131)

## Ligação

| Peça | Nota |
|---|---|
| H137 | H131 ↔ H126 dual chain |
| H131 | H126 ↔ H120 dual chain |
| H89 | subscription role proposal (sem wire) |

## Achado

H137 e H131 reforçam a cadeia glossário ↔ dual harness sem alterar ACL.

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-hd-01: cita H137 / H131 / H89  
- CT-hd-02: proíbe wire  
- CT-hd-03: assert CI

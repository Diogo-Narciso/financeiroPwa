# Índice — H142 dual chain ↔ H137 dual chain (H147)

**Status:** índice pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/h137-h131-dual-chain-index.md` (H142) · `docs/h131-h126-dual-chain-index.md` (H137)

## Ligação

| Peça | Nota |
|---|---|
| H142 | H137 ↔ H131 dual chain |
| H137 | H131 ↔ H126 dual chain |
| H89 | subscription role proposal (sem wire) |

## Achado

H142 e H137 reforçam a cadeia glossário ↔ dual harness sem alterar ACL.

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-hd-01: cita H142 / H137 / H89  
- CT-hd-02: proíbe wire  
- CT-hd-03: assert CI

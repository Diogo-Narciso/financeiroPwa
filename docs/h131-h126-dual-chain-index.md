# Índice — H131 dual chain ↔ H126 dual chain (H137)

**Status:** índice pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/h126-h120-dual-chain-index.md` (H131) · `docs/h120-h108-dual-chain-index.md` (H126)

## Ligação

| Peça | Nota |
|---|---|
| H131 | H126 ↔ H120 dual chain |
| H126 | H120 ↔ H108 dual chain |
| H89 | subscription role proposal (sem wire) |

## Achado

H131 e H126 reforçam a cadeia glossário ↔ dual harness sem alterar ACL.

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-hd-01: cita H131 / H126 / H89  
- CT-hd-02: proíbe wire  
- CT-hd-03: assert CI

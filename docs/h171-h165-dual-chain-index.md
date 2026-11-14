# Índice — H171 dual chain ↔ H165 dual chain (H177)

**Status:** índice pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/h165-h159-dual-chain-index.md` (H171) · `docs/h159-h153-dual-chain-index.md` (H165)

## Ligação

| Peça | Nota |
|---|---|
| H171 | H165 ↔ H159 dual chain |
| H165 | H159 ↔ H153 dual chain |
| H89 | subscription role proposal (sem wire) |

## Achado

H171 e H165 reforçam a cadeia glossário ↔ dual harness sem alterar ACL.

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-hd177-01: cita H171 / H165 / H89  
- CT-hd177-02: proíbe wire  
- CT-hd177-03: assert CI

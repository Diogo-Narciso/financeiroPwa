# Índice — H165 dual chain ↔ H159 dual chain (H171)

**Status:** índice pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/h159-h153-dual-chain-index.md` (H165) · `docs/h153-h147-dual-chain-index.md` (H159)

## Ligação

| Peça | Nota |
|---|---|
| H165 | H159 ↔ H153 dual chain |
| H159 | H153 ↔ H147 dual chain |
| H89 | subscription role proposal (sem wire) |

## Achado

H165 e H159 reforçam a cadeia glossário ↔ dual harness sem alterar ACL.

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-hd171-01: cita H165 / H159 / H89  
- CT-hd171-02: proíbe wire  
- CT-hd171-03: assert CI

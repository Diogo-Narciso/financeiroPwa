# Índice — H153 dual chain ↔ H147 dual chain (H159)

**Status:** índice pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/h147-h142-dual-chain-index.md` (H153) · `docs/h142-h137-dual-chain-index.md` (H147)

## Ligação

| Peça | Nota |
|---|---|
| H153 | H147 ↔ H142 dual chain |
| H147 | H142 ↔ H137 dual chain |
| H89 | subscription role proposal (sem wire) |

## Achado

H153 e H147 reforçam a cadeia glossário ↔ dual harness sem alterar ACL.

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-hd159-01: cita H153 / H147 / H89  
- CT-hd159-02: proíbe wire  
- CT-hd159-03: assert CI

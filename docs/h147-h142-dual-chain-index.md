# Índice — H147 dual chain ↔ H142 dual chain (H153)

**Status:** índice pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/h142-h137-dual-chain-index.md` (H147) · `docs/h137-h131-dual-chain-index.md` (H142)

## Ligação

| Peça | Nota |
|---|---|
| H147 | H142 ↔ H137 dual chain |
| H142 | H137 ↔ H131 dual chain |
| H89 | subscription role proposal (sem wire) |

## Achado

H147 e H142 reforçam a cadeia glossário ↔ dual harness sem alterar ACL.

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-hd153-01: cita H147 / H142 / H89  
- CT-hd153-02: proíbe wire  
- CT-hd153-03: assert CI

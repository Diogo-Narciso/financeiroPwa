# Índice — H159 dual chain ↔ H153 dual chain (H165)

**Status:** índice pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/h153-h147-dual-chain-index.md` (H159) · `docs/h147-h142-dual-chain-index.md` (H153)

## Ligação

| Peça | Nota |
|---|---|
| H159 | H153 ↔ H147 dual chain |
| H153 | H147 ↔ H142 dual chain |
| H89 | subscription role proposal (sem wire) |

## Achado

H159 e H153 reforçam a cadeia glossário ↔ dual harness sem alterar ACL.

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-hd165-01: cita H159 / H153 / H89  
- CT-hd165-02: proíbe wire  
- CT-hd165-03: assert CI

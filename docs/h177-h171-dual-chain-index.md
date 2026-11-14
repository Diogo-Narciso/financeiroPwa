# Índice — H177 dual chain ↔ H171 dual chain (H183)

**Status:** índice pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/h171-h165-dual-chain-index.md` (H177) · `docs/h165-h159-dual-chain-index.md` (H171)

## Ligação

| Peça | Nota |
|---|---|
| H177 | H171 ↔ H165 dual chain |
| H171 | H165 ↔ H159 dual chain |
| H89 | subscription role proposal (sem wire) |

## Achado

H177 e H171 reforçam a cadeia glossário ↔ dual harness sem alterar ACL.

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-hd183-01: cita H177 / H171 / H89  
- CT-hd183-02: proíbe wire  
- CT-hd183-03: assert CI

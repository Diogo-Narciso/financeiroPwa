# Índice — H183 dual chain ↔ H177 dual chain (H189)

**Status:** índice pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/h177-h171-dual-chain-index.md` (H183) · `docs/h171-h165-dual-chain-index.md` (H177)

## Ligação

| Peça | Nota |
|---|---|
| H183 | H177 ↔ H171 dual chain |
| H177 | H171 ↔ H165 dual chain |
| H89 | subscription role proposal (sem wire) |

## Achado

H183 e H177 reforçam a cadeia glossário ↔ dual harness sem alterar ACL.

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-hd189-01: cita H183 / H177 / H89  
- CT-hd189-02: proíbe wire  
- CT-hd189-03: assert CI

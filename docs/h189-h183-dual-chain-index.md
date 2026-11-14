# Índice — H189 dual chain ↔ H183 dual chain (H195)

**Status:** índice pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/h183-h177-dual-chain-index.md` (H189) · `docs/h177-h171-dual-chain-index.md` (H183)

## Ligação

| Peça | Nota |
|---|---|
| H189 | H183 ↔ H177 dual chain |
| H183 | H177 ↔ H171 dual chain |
| H89 | subscription role proposal (sem wire) |

## Achado

H189 e H183 reforçam a cadeia glossário ↔ dual harness sem alterar ACL.

## Proibições

- Não importar helpers nas routes.
- Não fechar E-R01/G-R01.
- Não inventar PSP cert.

## CTs

- CT-hd195-01: cita H189 / H183 / H89  
- CT-hd195-02: proíbe wire  
- CT-hd195-03: assert CI

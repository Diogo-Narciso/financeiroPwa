# Cross-index — webhook/mock ↔ billing AUTH (H99 / H91 · H76)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-B01 / E-R01  
**Fontes:** `docs/billing-webhook-auth-index.md` (H91) · `docs/billing-auth-gaps-index.md` (H76) · `docs/eb01-ops-notes.md` (H97)

## Comparativo

| Doc | Foco | Gaps |
|---|---|---|
| H76 | AUTH gaps plans/subscription/cancel | E-R01 (P2) · E-B01 (P3) |
| H91 | webhook/mock vs AUTH | E-B01 vs E-R01 |
| H97 | ops notes mock | E-B01 aberto |

## Achado consolidado

| ID | Nota | Pri |
|---|---|---|
| E-R01 | plans / subscription / cancel AUTH sem role array | P2 |
| E-B01 | webhook/mock sem sessão (mock esperado; ops H97) | P3 |

## Proibições

- Não editar handlers billing/webhook neste PR.
- Não inventar PSP cert / roles.
- Não fechar E-B01/E-R01/G-R01.

## CTs

- CT-wb-01: cita H76 / H91 / E-B01 / E-R01  
- CT-wb-02: proíbe alterar ACL / PSP cert  
- CT-wb-03: assert CI

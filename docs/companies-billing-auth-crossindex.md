# Cross-index — companies vs billing AUTH (H82 / H55 · H76)

**Status:** inventário cruzado · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/companies-auth-index.md` (H55) · `docs/billing-auth-gaps-index.md` (H76)

## Comparativo

| Área | Paths | Tag | Nota |
|---|---|---|---|
| companies | `companies/[id]` GET (e PATCH gated) | AUTH / gated | H55 · H65 |
| billing | `plans` · `subscription` · `cancel` | AUTH | H76 |
| billing | `webhook/mock` | sem sessão | mock esperado |

## Achado

| ID | Nota | Pri |
|---|---|---|
| E-R01 | companies + billing AUTH sem role array | P2 |
| E-B01 | webhook/mock fora do padrão sessão | P3 |

## Proibições

- Não editar handlers companies/billing neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-cb-01: cita H55 / H76 / E-R01  
- CT-cb-02: proíbe alterar ACL  
- CT-cb-03: assert CI

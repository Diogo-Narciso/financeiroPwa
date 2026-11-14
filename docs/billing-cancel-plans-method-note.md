# Nota — cancel POST vs plans GET (H109 / H100 · H104)

**Status:** nota de métodos · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-cancel-plans-roles-align.md` (H100) · `docs/h104-cancel-plans-align-harness.md`

## AS-IS / draft

| Path | Método | Roles sugeridas |
|---|---|---|
| `billing/plans` | GET | owner \| admin |
| `billing/cancel` | POST | owner \| admin |

Mesmo conjunto de roles apesar de métodos diferentes (leitura vs cancelamento).

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eR01Closed` | **false** |

## Proibições

- Não editar routes neste PR.
- Não inventar owner-only / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-cpn-01: cita H100 / GET / POST / owner|admin  
- CT-cpn-02: aclChangedInThisPR false  
- CT-cpn-03: assert CI

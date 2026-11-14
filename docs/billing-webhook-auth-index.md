# Índice — billing webhook/mock vs AUTH (H91 / H76 · E-B01)

**Status:** inventário pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** H76 billing AUTH gaps · `apps/web/src/app/api/billing/webhook/mock/route.ts`

## Comparativo

| Path | Tag | Nota |
|---|---|---|
| `billing/plans` · `subscription` · `cancel` | AUTH (`requireUser`) | H76 / E-R01 |
| `billing/webhook/mock` | **sem** sessão | mock sandbox; E-B01 |

## Achado

| ID | Nota | Pri |
|---|---|---|
| E-B01 | webhook/mock sem AUTH de sessão (esperado mock) | P3 |
| E-R01 | demais billing AUTH sem role array | P2 |

## Proibições

- Não editar handlers neste PR.
- Não inventar PSP cert / fechar E-R01.
- Não promover mock a produção neste cartão.

## CTs

- CT-wm-01: cita webhook/mock / E-B01 / H76  
- CT-wm-02: proíbe alterar ACL / PSP cert  
- CT-wm-03: assert CI

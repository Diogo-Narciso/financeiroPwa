# Matriz — gaps G-R01–04 (H42 / follow-up H37)

**Status:** priorização acionável · **não** altera ACL · **não** inventa role  
**Entrada:** `docs/roles-acoes-sensiveis.md` (H37)

## Matriz

| Gap | Descrição | Pri | Cartão sugerido | Dependência |
|---|---|---|---|---|
| G-R01 | Checagens de role espalhadas (sem matriz única no código) | P2 | H43 — inventário endpoints sem role check centralizado | H37 |
| G-R02 | `owner`≈`admin` em vários gates — confirmar se intencional | P2 | Nota de produto / ADR curto de papéis | PM + security |
| G-R03 | Sem role “fiscal-only” distinta de `reviewer` | P3 | Backlog pós go-live fiscal | SME |
| G-R04 | RLS Postgres ainda gap | P1 | Já apontado em H17 — cartão migração RLS futuro | dba |

## Fora de escopo H42

- Implementar RLS
- Mudar memberships / seeds de role
- Promover qualquer role a poder `homologated`

## Proibições

- Não “corrigir” ACL inventando permissões fiscais.
- Não abrir cross-tenant (manter H17 404).

## CTs

- CT-mgr-01: cita G-R01–04 e H37  
- CT-mgr-02: aponta H43 / H17 sem inventar role  
- CT-mgr-03: assert CI

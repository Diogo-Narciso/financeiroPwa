# Pack — evidências staging dry-run purge (H61 / pós H56)

**Status:** template de evidência · **não** executa purge · **não** fecha P10  
**Fontes:** `docs/audit-events-purge-dryrun.md` (H56) · H51

## Objetivo

Definir o pacote mínimo de evidências após dry-run em staging (D-01–D-06).

## Pack (todos abertos / placeholders)

| ID | Evidência | Situação |
|---|---|---|
| E-S01 | Contagem por tenant (>12m draft) anexada | aberto |
| E-S02 | Sample IDs de ações mínimas preservadas | aberto |
| E-S03 | Confirmação legal hold / dual control | aberto |
| E-S04 | Log dry-run sem DELETE | aberto |
| E-S05 | `purgeJobExists` ainda false | **false** |
| E-S06 | Link ticket staging | null |

## Proibições

- Não rodar DELETE em produção.
- Não marcar H51 implementação / P10 como feitos.
- Não misturar tenants nas evidências.

## CTs

- CT-se-01: cita H56 / E-S01–E-S06  
- CT-se-02: purgeJobExists false + proíbe DELETE  
- CT-se-03: assert CI

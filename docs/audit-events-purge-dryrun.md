# Checklist — dry-run purge `audit_events` (H56 / pós H51)

**Status:** checklist operacional · **não** executa purge · **não** fecha P10  
**Fontes:** `docs/audit-events-purge-job-spec.md` (H51) · H46

## Objetivo

Antes de qualquer job real, validar contagens e dual control em staging.

## Checklist (todos abertos)

| ID | Item | Situação |
|---|---|---|
| D-01 | Contagem por `tenant_id` de eventos > 12 meses (draft) | aberto |
| D-02 | Amostra de ações mínimas preservadas (H11) | aberto |
| D-03 | Legal hold / custódia conferidos | aberto |
| D-04 | Dual control (ticket + aprovação) registrado | aberto |
| D-05 | Dry-run SQL/script em staging sem DELETE | aberto |
| D-06 | `purgeJobExists` permanece false até implementador | **false** |

## Proibições

- Não rodar DELETE em produção neste cartão.
- Não marcar P10 / H51 implementação como feitos.
- Não misturar tenants nas contagens.

## CTs

- CT-dr-01: cita H51 / dry-run / D-01–D-06  
- CT-dr-02: purgeJobExists false + proíbe DELETE prod  
- CT-dr-03: assert CI

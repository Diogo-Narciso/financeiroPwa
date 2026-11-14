# Spec — job de purge `audit_events` (H51 / pós H46)

**Status:** especificação operacional · **não** implementa job · **não** fecha P10  
**Fontes:** `docs/audit-events-retencao.md` · H11 · H46 (`purgeJobExists=false`)

## Objetivo

Definir o contrato do futuro job de purge/arquivo frio de `audit_events` após retenção operacional (≥ 12 meses draft H11).

## Contrato do job (futuro)

| Campo | Valor draft | Nota |
|---|---|---|
| `jobId` | `audit_events_purge` | estável |
| `purgeJobExists` | **false** | permanece false até implementação |
| `schedule` | null | ops decide (cron) — não inventar aqui |
| `batchSize` | null | ops |
| `operationalMonths` | 12 (draft) | **não** contratual até jurídico |
| `dualControlRequired` | true | dois operadores / ticket + aprovação |
| `legalHoldBlocksPurge` | true | custódia/fiscal bloqueia |
| `coldArchiveFirst` | preferível | arquivo frio antes de delete |
| `auditOfPurge` | obrigatório | registrar `audit_events` do próprio purge |

## Pré-condições para ligar o job

1. Revisão jurídica/privacidade (P10) dos prazos.
2. Dual control + legal hold documentados em runbook.
3. Dry-run em staging com contagem por tenant.
4. `purgeJobExists` só vira true após merge do implementador + evidência.

## Proibições

- Não apagar `audit_events` em produção neste cartão.
- Não misturar tenants no batch.
- Não marcar P10 / H46 purge como feito.
- Não hardcodar FQDN ou credenciais no spec.

## CTs

- CT-pj-01: cita H46 / H11 / `audit_events_purge` / 12 meses  
- CT-pj-02: `purgeJobExists` false + dual control + proíbe purge silencioso  
- CT-pj-03: assert CI

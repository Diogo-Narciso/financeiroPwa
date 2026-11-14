# Índice — retenção `audit_events` (H46 / H11)

**Status:** detalhamento operacional · **não** implementa purge job · **não** fecha P10  
**Fontes:** `docs/lgpd-retencao.md` · `packages/shared` RETENTION_POLICY · H11

## AS-IS

| Peça | Situação |
|---|---|
| Tabela `audit_events` | Existe (session.audit) |
| Retenção proposta H11 | ≥ 12 meses operacionais; depois arquivo/purge com log |
| Job de purge | **ausente** |
| Export titular | ausente (follow-up H11) |

## Campos de política (vazios até jurídico/ops)

| Campo | Tipo | Nota |
|---|---|---|
| `operationalMonths` | number \| null | Draft H11 = 12 — **não** contratual até revisão |
| `coldArchiveEnabled` | boolean \| null | null = não decidido |
| `purgeJobExists` | boolean | **false** neste pacote |
| `purgeRequiresDualControl` | boolean | sugerido true |
| `legalHoldBlocksPurge` | boolean | true se custódia/fiscal |

## Ações mínimas a preservar (H11)

`company.created`, `trial.*_quota_blocked`, import commit/release, tax run create, billing mock events, homologation updates.

## Proibições

- Não apagar `audit_events` silenciosamente em produção neste cartão.
- Não misturar tenants em dumps de titular.
- Não marcar P10 como fechado.

## CTs

- CT-ae-01: cita audit_events + H11 + 12 meses  
- CT-ae-02: purgeJobExists false / proíbe purge silencioso  
- CT-ae-03: assert CI

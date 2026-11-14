# Ops — backup / restore drill (H13 / P13)

**Status:** procedimento local documentado · **não** afirma backup gerenciado em produção  
**Agente:** dba · **História:** H13  
**Script:** `scripts/e7-backup-restore-drill.sh`

## Objetivo

Ensaiar dump Postgres + validação mínima do artefato, com evidência reproduzível, para tirar P13/L13 do estado “só checkbox sem procedimento”.

## Pré-requisitos

| Item | Nota |
|---|---|
| Postgres acessível | `DATABASE_URL` no `.env` ou default `postgresql://portal:portal@127.0.0.1:5432/portal_difal` |
| `pg_dump` / `psql` no PATH | cliente PostgreSQL 16 compatível com `docker-compose.yml` |
| Disco em `storage/backups/` | gitignored; dumps não vão ao repo |

## RPO / RTO propostos (MVP — revisar com ops)

| Métrica | Proposta MVP | Nota |
|---|---|---|
| RPO | ≤ 24 h | dump diário até haver PITR |
| RTO | ≤ 4 h | restore manual ensaiado em ambiente controlado |

Valores **não** contratualizados; só alvo operacional draft.

## Procedimento

```bash
# 1) Dump (+ opcional --restore-check em DB scratch)
bash scripts/e7-backup-restore-drill.sh

# 2) Restore check em banco throwaway (não usa o DB de app por padrão)
DRILL_RESTORE_DB=portal_difal_drill_restore bash scripts/e7-backup-restore-drill.sh --restore-check
```

O script:

1. Carrega `DATABASE_URL` do `.env` (só essa chave).
2. Gera `storage/backups/portal_difal_<UTC>.sql`.
3. Recusa dump vazio / &lt; 100 bytes.
4. Escreve `storage/backups/last-drill.json` (stamp, bytes, modo).
5. Com `--restore-check`: cria DB scratch (se possível), aplica o dump, confere `SELECT 1`, dropa o scratch.

## Evidência

- Artefato: dump em `storage/backups/`
- Metadado: `last-drill.json`
- Checklist: este doc + item P13 no `lancamento-checklist.md`

## O que ainda NÃO fecha P13

- Backup gerenciado (cloud snapshot / PITR)
- Criptografia at-rest do dump fora do host
- Domínio / suporte / monitoramento (resto de P13)
- Marcar item de homologação como aprovado

## CTs

- CT-ops-01: script dry-run sem `DATABASE_URL` usa default e falha de forma clara se Postgres down
- CT-ops-02: dump ≥ 100 bytes + `last-drill.json`
- CT-ops-03: doc + link no checklist

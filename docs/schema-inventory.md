# Inventário de schema Postgres (H18 · DBA)

**Agente:** dba · **Migrações:** `infra/migrations/001_foundation.sql` … `008_e7_homologation_launch.sql`  
**HEAD:** pós-E7 · sem PII real neste documento

## Domínios

| Migração | Domínio | Tabelas / objetos principais |
|---|---|---|
| 001 | Fundação | tenants/orgs base, extensões |
| 002 | Auth + quotas E1 | users/sessions, `companies`, `trial_company_slots`, `entry_invoice_usage` (reserved/committed/released) |
| 003 | Imports E2 | lotes, documentos XML, itens NF-e |
| 004 | Classificação E3 | decisões, review, auditoria de item |
| 005 | Tax engine E4 | `tax_runs`, scenarios, item results, calculation steps |
| 006 | Export E5 | exports / ZIP escrituração |
| 007 | Billing E6 | plans, subscriptions, contratos |
| 008 | Homologação E7 | checklist / pendências de lançamento |

## Quotas (inalteráveis neste cartão)

- Máx. **3** CNPJs/org (`trial_company_slots`) — arquivar **não** libera vaga.
- Máx. **5** NF-e entrada/CNPJ (`entry_invoice_usage` em `reserved`\|`committed`; `released` não conta).

## Gaps priorizados

| ID | Pri | Gap | Próximo |
|---|---|---|---|
| G1 | P0 | Testes de isolamento tenant / anti-IDOR além de smokes | H17 |
| G2 | P1 | RLS Postgres explícito (hoje app-layer) | H17 / security |
| G3 | P1 | Retenção/purge LGPD de uploads e audit | H11 |
| G4 | P1 | Drill backup/restore documentado + script | H13 → `docs/ops-backup-restore.md` (local; P13 parcial) |
| G5 | P2 | Índice/consulta agregada para métricas MVP | H19 → dba se precisar DDL |
| G6 | P2 | Coluna persistida `rule_status` em `tax_item_results` (hoje só no payload) | opcional pós-H9 |

## CTs DBA

- CT-db-01: inventário cobre 001–008 — este doc  
- CT-db-02: gaps sem alíquota inventada — ok  
- CT-db-03: próximos acionáveis H11/H13/H17 — ok  

## Comandos

```bash
pnpm db:migrate
pnpm db:status
```

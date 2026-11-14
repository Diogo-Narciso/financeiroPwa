# Glossário de métricas MVP (H19 · Data-analyst)

**Agente:** data-analyst · dados **sintéticos** / dev · filtro **tenant** obrigatório  
**Disclaimer:** métricas de produto/ops — **não** substituem parecer SME nem regra `homologated`.

## Métricas

| ID | Métrica | Definição | Fonte | Filtro |
|---|---|---|---|---|
| M01 | Orgs ativas | Contagem de organizações com ≥1 user | auth/org tables (002) | — |
| M02 | CNPJs em cota | `COUNT(trial_company_slots)` por tenant | 002 | `tenant_id` |
| M03 | Cota CNPJ restante | `3 - M02` | shared `TRIAL_LIMITS` | `tenant_id` |
| M04 | NF-e entrada ativas | usage `reserved`+`committed` por company | 002 | `tenant_id`, `company_id` |
| M05 | Cota NF-e restante | `5 - M04` | shared limits | company |
| M06 | Imports com erro | lotes/docs status erro | 003 | tenant |
| M07 | Itens pendentes revisão | classificação sem decisão final | 004 | tenant |
| M08 | Tax runs demo | runs mode demo_arithmetic | 005 | tenant · `ruleStatus=demo` |
| M09 | Tax runs pending | outcomes `pending_validation` | 005 | tenant · ≠ homologated |
| M10 | Assinaturas mock | subscriptions `mock_sandbox` | 007 | tenant |
| M11 | Checklist E7 aberto | pendências não fechadas | 008 | global/ops |

## Qualidade de dados (DQ) — checklist dev

1. Nenhuma chave de acesso / CNPJ de produção em fixtures (`scripts/fixtures`).
2. `entry_invoice_usage` com `released` **não** entra em M04.
3. Resultados com números DIFAL e `ruleStatus=demo` **não** entram em KPIs “fiscais oficiais”.
4. Contagens sempre escopadas por `tenant_id` (exceto M11 ops).
5. Duplicidade: mesmo `access_key` ativo não cria segunda cota (unique parcial).

## CTs

- CT-da-01: ≥8 métricas — ok (11)  
- CT-da-02: disclaimer demo vs homologated — ok  
- CT-da-03: checklist DQ — ok  

## Próximo

Se precisar materializar views → cartão **dba** (H18 G5). Sem DDL neste cartão.

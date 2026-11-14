# Política de retenção LGPD — draft operacional (H11)

**Status:** draft técnico para implementação · **não** substitui revisão jurídica/privacidade (P10)  
**Agente:** security + dba (schema) · **História:** H11  
**Escopo:** dados do Portal DIFAL em ambiente controlado / MVP.

## Papéis (mapa mínimo)

| Papel LGPD | Quem no produto |
|---|---|
| Controlador | Organização cliente (escritório/empresa) |
| Operador | Oliveira Contabilidade / operador do SaaS (a confirmar juridicamente) |
| Titular | Pessoas físicas cujos dados apareçam em cadastro/XML (minimizar) |

## Finalidades

1. Prestação do serviço fiscal (importação, classificação, cálculo, exportação).
2. Segurança, auditoria e prevenção a fraude.
3. Cumprimento de obrigações legais/contábeis do cliente (custódia do XML sob controle do cliente).

## Classes de dados e retenção proposta (MVP)

| Classe | Exemplos | Retenção proposta | Base / nota |
|---|---|---|---|
| Conta / auth | email, session | Enquanto conta ativa + 30 dias após exclusão solicitada | Execução contrato |
| Cadastro empresa | CNPJ, razão social | Enquanto vínculo org + cota trial; arquivamento lógico sem liberar cota | Execução contrato |
| XML NF-e original | storage imutável | Custódia do cliente; não apagar silenciosamente; exclusão só com pedido formal + auditoria | Obrigação fiscal do cliente |
| Derivados análise | classificação, tax_runs | Espelhar vida do documento-fonte; soft-delete preferível | Legítimo interesse / contrato |
| Audit events | `audit_events` | Mín. 12 meses operacionais; depois arquivo frio ou purge com log | Segurança |
| Billing mock | subscriptions sandbox | Até fim do teste / 90 dias inativo | Contrato |
| Logs app | runtime | Sem PII desnecessária; 30 dias | Segurança |

Valores em `packages/shared/src/retention-policy.ts` — **ajustáveis após jurídico**.

## Trilhas mínimas (já existentes / gaps)

| Trilha | Situação | Gap H11 |
|---|---|---|
| `audit_events` | Existe (session.audit) | Documentar ações mínimas obrigatórias |
| Storage imutável XML | E2 | Proibir overwrite; exclusão só workflow formal |
| Export titular | Ausente | Backlog follow-up (não neste cartão: só especificar) |
| Purge job | Ausente | Spec → cartão dba futuro |

### Ações de auditoria mínimas a manter

`company.created`, `trial.*_quota_blocked`, import commit/release, tax run create, billing mock events, homologation updates.

## Direitos do titular (procedimento MVP)

1. Canal: suporte da organização controladora (não self-service público neste MVP).
2. Acesso/export: ticket + evidência de legitimidade → dump escopo tenant (sem misturar tenants).
3. Eliminação: avaliar bloqueios legais (custódia XML) antes de purge; registrar `audit_events`.

## Fora de escopo H11

- Texto final de política de privacidade / DPA
- Job automático de purge em produção
- RLS Postgres (H17)

## CTs

- CT-01: doc + constantes `RETENTION_POLICY` no shared
- CT-02: unit test lê prazos sem inventar regra fiscal
- CT-03: checklist lançamento aponta este draft (P10)

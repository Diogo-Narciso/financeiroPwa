# Runbook — suporte / incidentes P13 (H36)

**Status:** draft operacional · **não** fecha P13 · **não** publica canal oficial  
**Pré:** H31 checklist P13 · H13 backup drill

## Objetivo

Definir o **esqueleto** do runbook de suporte e resposta a incidentes (S01/S02 do H31) sem inventar SLA contratual nem domínio.

## Contatos (vazios)

| Campo | Valor | Nota |
|---|---|---|
| `supportContact` | _a preencher_ | Canal oficial (e-mail/ticket) — P13 S01 |
| `escalationOwner` | _a preencher_ | Proprietário / plantão técnico |
| `statusPageUrl` | null | Opcional; null até existir |

## Severidades (draft)

| Sev | Exemplos | Resposta alvo (não contratual) |
|---|---|---|
| S1 | Indisponibilidade total / perda de dados | Contatar escalationOwner; preservar logs |
| S2 | Billing/webhook falhando; import XML em massa | Isolar tenant; sem reprocessar cego |
| S3 | UX / dúvida fiscal de um cliente | Encaminhar a responsável fiscal — **não** inventar alíquota |

## Checklist de incidente

1. Registrar `incidentId`, início, impacto (tenants).  
2. Não rotacionar segredos no chat; usar store de secrets.  
3. Backup: seguir `ops-backup-restore.md` (H13) — não restaurar prod sem aprovação.  
4. Pós: preencher `incidentRunbookUrl` evidência (H31 S02) quando houver doc real.  
5. Fiscal: qualquer dúvida de DIFAL → pendente de validação / SME.

## Proibições

- Não prometer SLA ou uptime neste draft.
- Não marcar P13 como aprovado.
- Não publicar preço/suporte incluso sem P07.

## CTs

- CT-rb-01: cita P13 / H31 / suporte / incidente  
- CT-rb-02: proíbe fechar P13 / inventar alíquota  
- CT-rb-03: assert CI

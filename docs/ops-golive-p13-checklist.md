# Checklist — ops go-live P13 (H31)

**Status:** campos / itens a fechar · **não** marca P13 como feito · **não** publica domínio/marca  
**Fontes:** `03_FONTES_E_PENDENCIAS.md` P13 · `lancamento-checklist.md` · H13 `ops-backup-restore.md`

## Aviso

H13 documentou **drill local** de backup/restore. Este cartão lista o que ainda falta para P13 (domínio, monitoramento, suporte, infra gerenciada).  
Nada abaixo autoriza lançamento comercial.

## Itens (vazios até evidência)

| ID | Campo | Evidência mínima | Situação |
|---|---|---|---|
| D01 | `productionDomain` | DNS + TLS no domínio escolhido | aberto |
| D02 | `brandAssetsApproved` | marca/logo aprovados pelo proprietário | aberto |
| M01 | `uptimeMonitoringUrl` | healthcheck externo em `/api/health` | aberto |
| M02 | `errorAlertChannel` | canal de alerta (ex. e-mail/Slack ops) | aberto |
| M03 | `logRetentionDays` | política de logs alinhada a LGPD (H11) | aberto |
| S01 | `supportContact` | canal oficial de suporte | aberto |
| S02 | `incidentRunbookUrl` | runbook de incidentes (link interno) | aberto |
| I01 | `managedBackupEnabled` | backup gerenciado ≠ só drill H13 | aberto |
| I02 | `restoreDrillEvidence` | evidência do último drill (`ops-backup-restore`) | parcial (H13 local) |
| I03 | `rpoRtoAgreed` | RPO/RTO acordados com ops (não só draft H13) | aberto |

## Proibições

- Não marcar P13 / lançamento como aprovado a partir deste doc.
- Não inventar domínio, PSP ou provedor de monitoramento.
- Drill H13 **não** substitui backup gerenciado (I01).

## Ligação

- Backup: `docs/ops-backup-restore.md`  
- Lançamento: `docs/lancamento-checklist.md`  
- H36 (runbook suporte detalhado) pode aprofundar S02

## CTs

- CT-p13-01: cita P13 / domínio / monitoramento / suporte  
- CT-p13-02: afirma P13 ainda aberto / não aprovado  
- CT-p13-03: assert CI

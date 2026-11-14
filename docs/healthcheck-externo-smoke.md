# Smoke — healthcheck externo (H38 / P13 M01)

**Status:** draft de procedimento · **não** configura monitoramento · **não** fecha P13  
**Ligação:** H31 M01 `uptimeMonitoringUrl` · `GET /api/health`

## Objetivo

Definir um **smoke mínimo** que um monitor externo (ou cron) pode executar contra o app — sem inventar provedor nem URL de produção.

## Smoke

```bash
# Local / staging com app no ar
curl -sfS "$BASE_URL/api/health"
# Esperado: HTTP 2xx e corpo JSON saudável (sem segredos)
```

| Campo | Valor |
|---|---|
| `path` | `/api/health` |
| `method` | GET |
| `success` | status 2xx |
| `fail` | timeout / 5xx / conexão recusada |
| `secretsInBody` | **proibido** |

## Campos do monitor (vazios até ops)

| Campo | Tipo | Nota |
|---|---|---|
| `uptimeMonitoringUrl` | URL \| null | H31 M01 — null até domínio (D01) |
| `checkIntervalSeconds` | number \| null | Draft; não contratual |
| `alertChannel` | string \| null | H31 M02 |

## Proibições

- Não marcar P13/M01 como feito.
- Não hardcodar domínio de produção neste doc.
- Não expor tokens no health payload.

## CTs

- CT-hc-01: cita `/api/health` e H31 M01  
- CT-hc-02: afirma P13 aberto / proíbe secrets  
- CT-hc-03: assert CI

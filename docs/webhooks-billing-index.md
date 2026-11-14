# Índice — webhooks de billing (H41 / pós H12·H34)

**Status:** inventário AS-IS · **não** ativa webhook live · **não** adiciona PSP  
**Código:** `apps/web/src/app/api/billing/webhook/mock` · `billing.ts` / `billing_events`

## AS-IS

| Peça | Path / peça | Situação |
|---|---|---|
| Webhook mock | `POST /api/billing/webhook/mock` | Sandbox; sem chaves de provedor |
| Idempotência | `billing_events.idempotency_key` | Dedup no processMockWebhook |
| Provider live | `UnconfiguredLiveBillingProvider` | Fail-closed (H12) |
| Webhook live | — | **ausente** (gap) |

## Gaps para webhook real

| ID | Gap | Dependência |
|---|---|---|
| G-WH-01 | Rota por `providerId` + verify assinatura | H12 `verifyAndNormalizeWebhook` |
| G-WH-02 | Segredo webhook no secrets store | H34 G-P11-03 |
| G-WH-03 | DPA / base legal do fluxo de pagamento | H40 |
| G-WH-04 | Replay/timeout e DLQ documentados | ops |
| G-WH-05 | Homologação “pagamentos reais” | E7 / H34 G-P11-06 |

## Proibições

- Não expor rota live sem assinatura verificada.
- Não logar payload completo com PII em claro.
- Não marcar P11 como fechado.

## CTs

- CT-wh-01: cita mock webhook + billing_events  
- CT-wh-02: lista gaps / proíbe live sem verify  
- CT-wh-03: assert CI

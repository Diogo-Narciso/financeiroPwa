# Security hardening — publish review (E-B01 mock webhook)

**Status:** correção de produto · fecha escrita anônima no mock webhook  
**Motivo:** Cursor security review bloqueou publish (`missing_authentication` no mock billing).

## Mudanças

| Item | Antes | Depois |
|---|---|---|
| `POST /api/billing/webhook/mock` | Aberto; alterava assinatura por `subscriptionId` | **404** sem `MOCK_BILLING_WEBHOOK_SECRET`; **401** se header `x-mock-webhook-secret` inválido |
| `.env.example` | `DATABASE_URL` com usuário/senha de exemplo | Placeholders `USER:PASSWORD` (sem credencial) |

## Local / sandbox

```bash
# .env (não versionar)
MOCK_BILLING_WEBHOOK_SECRET=dev-only-long-random

curl -X POST "$ORIGIN/api/billing/webhook/mock" \
  -H "content-type: application/json" \
  -H "x-mock-webhook-secret: $MOCK_BILLING_WEBHOOK_SECRET" \
  -d '{"idempotencyKey":"…","eventType":"payment.succeeded","subscriptionId":"…"}'
```

Published hosting: **deixe o segredo unset** → rota permanece 404.

## CTs

- CT-sec-pub-01: sem segredo → 404  
- CT-sec-pub-02: segredo errado → 401  
- CT-sec-pub-03: `.env.example` sem password literal  

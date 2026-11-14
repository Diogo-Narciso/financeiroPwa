# Spike — adapter de pagamento real (H12 / P11)

**Status:** spike + contrato tipado · **não** ativa cobrança ao vivo  
**Agente:** tech-lead + coder · **História:** H12  
**Código:** `apps/web/src/server/billing-provider.ts`

## AS-IS

| Peça | Situação |
|---|---|
| `BillingProvider.checkout` | Existe; só `MockSandboxBillingProvider` |
| Webhook | Rota `api/billing/webhook/mock` + `billing_events` idempotente |
| Preços | `plan_versions.is_price_placeholder` — oficiais pendentes (P07) |
| Homologação | Checklist marca mock_sandbox / sem provedor real |

## Contrato proposto (`PaymentAdapter`)

Estende o provider atual:

1. `checkout(CheckoutInput) → CheckoutResult` — já existe
2. `verifyAndNormalizeWebhook(raw) → WebhookEvent` — novo (assinatura + tipo)
3. `providerId` estável: `mock_sandbox` \| `unconfigured_live` \| (futuro: gateway escolhido)

`CheckoutResult.provider` deixa de ser literal só `mock_sandbox` e passa a `BillingProviderId`.

## Candidatos (não decididos)

| Candidato | Prós | Contras / pré-requisitos |
|---|---|---|
| Mercado Pago | Forte no BR, assinaturas | Conta PJ, webhooks, homologação |
| Stripe | API madura, Billing | Conta + KYC; preço oficial ainda P07 |
| Outro PSP BR | Conformidade local | Avaliar só com jurídico/comercial |

**Decisão de PSP:** fora deste cartão — exige P07 preços + P11 conta + DPA.

## Gate de produção

Live só quando **todos** forem verdadeiros:

1. `BILLING_PROVIDER` ≠ `mock_sandbox`
2. Segredos do gateway configurados (nunca no repo)
3. Preço `approved` + `publishable` + `!is_price_placeholder`
4. Item homologação “pagamentos reais” marcado

Hoje o default continua `MockSandboxBillingProvider`. `UnconfiguredLiveBillingProvider` recusa checkout com erro explícito (spike de segurança).

## Fora de escopo H12

- Conta real / chaves
- UI de checkout hospedado
- Migração de subscriptions pagas
- Precificação oficial

## CTs

- CT-01: mock checkout → `sandbox_only`
- CT-02: unconfigured live → rejeita cobrança
- CT-03: doc spike + link checklist P11

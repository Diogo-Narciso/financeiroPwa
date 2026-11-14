/**
 * Billing / payment adapter surface (H12 spike).
 *
 * Production gateways plug in behind PaymentAdapter later.
 * This repo ships MockSandboxBillingProvider (default) and an
 * UnconfiguredLiveBillingProvider that refuses live charges.
 * No real API keys, no live charges.
 */

export type BillingProviderId =
  | "mock_sandbox"
  | "unconfigured_live";

export type CheckoutInput = {
  tenantId: string;
  planVersionId: string;
  contractMode: string;
  idempotencyKey: string;
};

export type CheckoutResult = {
  provider: BillingProviderId;
  status: "sandbox_only" | "requires_official_price" | "rejected_unconfigured";
  externalRef: string;
  message: string;
};

export type WebhookInput = {
  idempotencyKey: string;
  eventType: string;
  payload: Record<string, unknown>;
};

export type NormalizedWebhookEvent = {
  provider: BillingProviderId;
  idempotencyKey: string;
  eventType: string;
  payload: Record<string, unknown>;
  signatureValid: boolean;
};

/** Alias kept for callers; same contract as BillingProvider. */
export interface PaymentAdapter {
  readonly name: BillingProviderId;
  checkout(input: CheckoutInput): Promise<CheckoutResult>;
  verifyAndNormalizeWebhook(
    input: WebhookInput,
    headers?: Record<string, string | undefined>,
  ): Promise<NormalizedWebhookEvent>;
}

export type BillingProvider = PaymentAdapter;

/** MOCK/SANDBOX — never calls external payment APIs. */
export class MockSandboxBillingProvider implements PaymentAdapter {
  readonly name = "mock_sandbox" as const;

  async checkout(input: CheckoutInput): Promise<CheckoutResult> {
    return {
      provider: "mock_sandbox",
      status: "sandbox_only",
      externalRef: `mock_${input.idempotencyKey}`,
      message:
        "MOCK/SANDBOX: nenhum provedor real. Sem cobrança. Configure preços oficiais e gateway antes de produção.",
    };
  }

  async verifyAndNormalizeWebhook(
    input: WebhookInput,
  ): Promise<NormalizedWebhookEvent> {
    return {
      provider: "mock_sandbox",
      idempotencyKey: input.idempotencyKey,
      eventType: input.eventType,
      payload: input.payload,
      signatureValid: true,
    };
  }
}

/**
 * Stand-in for a future live gateway before secrets/PSP are chosen.
 * Exists so wiring can flip env → live path and still fail closed.
 */
export class UnconfiguredLiveBillingProvider implements PaymentAdapter {
  readonly name = "unconfigured_live" as const;

  async checkout(_input: CheckoutInput): Promise<CheckoutResult> {
    return {
      provider: "unconfigured_live",
      status: "rejected_unconfigured",
      externalRef: "",
      message:
        "LIVE billing não configurado (H12/P11). Sem PSP, sem segredos, sem cobrança.",
    };
  }

  async verifyAndNormalizeWebhook(
    input: WebhookInput,
  ): Promise<NormalizedWebhookEvent> {
    return {
      provider: "unconfigured_live",
      idempotencyKey: input.idempotencyKey,
      eventType: input.eventType,
      payload: input.payload,
      signatureValid: false,
    };
  }
}

export function resolveBillingProvider(
  envValue: string | undefined = process.env.BILLING_PROVIDER,
): PaymentAdapter {
  if (envValue === "unconfigured_live") {
    return new UnconfiguredLiveBillingProvider();
  }
  return new MockSandboxBillingProvider();
}

export const defaultBillingProvider: PaymentAdapter = resolveBillingProvider();

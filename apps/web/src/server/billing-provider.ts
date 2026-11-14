/**
 * BillingProvider abstraction.
 *
 * Production gateways (e.g. Mercado Pago) plug in here later.
 * This repo ships only MockSandboxBillingProvider — clearly labeled,
 * no real API keys, no live charges.
 */

export type CheckoutInput = {
  tenantId: string;
  planVersionId: string;
  contractMode: string;
  idempotencyKey: string;
};

export type CheckoutResult = {
  provider: "mock_sandbox";
  status: "sandbox_only" | "requires_official_price";
  externalRef: string;
  message: string;
};

export type WebhookInput = {
  idempotencyKey: string;
  eventType: string;
  payload: Record<string, unknown>;
};

export interface BillingProvider {
  readonly name: string;
  checkout(input: CheckoutInput): Promise<CheckoutResult>;
}

/** MOCK/SANDBOX — never calls external payment APIs. */
export class MockSandboxBillingProvider implements BillingProvider {
  readonly name = "mock_sandbox";

  async checkout(input: CheckoutInput): Promise<CheckoutResult> {
    return {
      provider: "mock_sandbox",
      status: "sandbox_only",
      externalRef: `mock_${input.idempotencyKey}`,
      message:
        "MOCK/SANDBOX: nenhum provedor real. Sem cobrança. Configure preços oficiais e gateway antes de produção.",
    };
  }
}

export const defaultBillingProvider: BillingProvider = new MockSandboxBillingProvider();

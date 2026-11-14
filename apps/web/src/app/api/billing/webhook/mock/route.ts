import { BillingError, processMockWebhook } from "@/server/billing";
import { jsonError, jsonOk } from "@/server/http";

export const runtime = "nodejs";

/**
 * MOCK/SANDBOX payment webhook — no real provider keys.
 * Idempotent via idempotencyKey.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      idempotencyKey?: string;
      eventType?: string;
      tenantId?: string;
      subscriptionId?: string;
      payload?: Record<string, unknown>;
    };
    if (!body.idempotencyKey || !body.eventType) {
      return jsonOk({ error: "idempotencyKey e eventType são obrigatórios." }, 400);
    }
    const result = await processMockWebhook({
      idempotencyKey: body.idempotencyKey,
      eventType: body.eventType,
      tenantId: body.tenantId,
      subscriptionId: body.subscriptionId,
      payload: body.payload,
    });
    return jsonOk({
      ok: true,
      provider: "mock_sandbox",
      notice: "Adapter mock — sem cobrança real.",
      ...result,
    });
  } catch (error) {
    if (error instanceof BillingError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    return jsonError(error);
  }
}

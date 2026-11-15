import { BillingError, processMockWebhook } from "@/server/billing";
import { jsonError, jsonOk } from "@/server/http";
import { timingSafeEqualString } from "@/server/secure-compare";

export const runtime = "nodejs";

/**
 * MOCK/SANDBOX payment webhook — no real provider keys.
 * Disabled unless MOCK_BILLING_WEBHOOK_SECRET is set; callers must send
 * matching `x-mock-webhook-secret`. Never accept unauthenticated writes.
 */
export async function POST(request: Request) {
  try {
    const configured = process.env.MOCK_BILLING_WEBHOOK_SECRET?.trim() ?? "";
    if (!configured) {
      return jsonOk(
        {
          error: "Mock billing webhook desabilitado (segredo não configurado).",
          code: "MOCK_WEBHOOK_DISABLED",
        },
        404,
      );
    }
    const provided = request.headers.get("x-mock-webhook-secret") ?? "";
    if (!timingSafeEqualString(provided, configured)) {
      return jsonOk({ error: "Não autorizado.", code: "UNAUTHORIZED" }, 401);
    }

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

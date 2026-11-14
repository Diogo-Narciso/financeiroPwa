import { BillingError, requestCancellation } from "@/server/billing";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = (await request.json()) as { reason?: string };
    const result = await requestCancellation({
      tenantId: user.tenantId,
      actorUserId: user.id,
      reason: body.reason ?? "",
    });
    return jsonOk({
      ok: true,
      cancellation: result,
      notice:
        "Multa/cancelamento: fee_policy_status=pending_legal_approval. Sem cobrança automática.",
    });
  } catch (error) {
    if (error instanceof BillingError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    return jsonError(error);
  }
}

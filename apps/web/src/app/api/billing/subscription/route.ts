import {
  BillingError,
  acceptPlanContract,
  ensureTrialSubscription,
  getSubscription,
} from "@/server/billing";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await requireUser();
    const data = await getSubscription(user.tenantId);
    return jsonOk({ ...data, provider: "mock_sandbox" });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = (await request.json()) as {
      action?: string;
      planVersionId?: string;
      contractMode?:
        | "monthly_flexible"
        | "six_month_commitment"
        | "annual_commitment"
        | "negotiated"
        | "trial";
      acceptContractTemplateCode?: string;
    };

    if (body.action === "ensure_trial") {
      const sub = await ensureTrialSubscription({
        tenantId: user.tenantId,
        actorUserId: user.id,
      });
      return jsonOk({ ok: true, subscription: sub, provider: "mock_sandbox" });
    }

    if (body.action === "accept_contract") {
      if (!body.planVersionId || !body.acceptContractTemplateCode || !body.contractMode) {
        return jsonOk(
          { error: "planVersionId, contractMode e acceptContractTemplateCode são obrigatórios." },
          400,
        );
      }
      const result = await acceptPlanContract({
        tenantId: user.tenantId,
        actorUserId: user.id,
        planVersionId: body.planVersionId,
        contractMode: body.contractMode,
        acceptContractTemplateCode: body.acceptContractTemplateCode,
      });
      return jsonOk({ ok: true, ...result });
    }

    return jsonOk({ error: "action inválida" }, 400);
  } catch (error) {
    if (error instanceof BillingError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    return jsonError(error);
  }
}

import { AnalysisError, saveManualTaxDecision } from "@/server/analysis";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";

const ACTIONS = [
  "follow_system",
  "include_difal",
  "exclude_difal",
  "return_to_system_analysis",
] as const;

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const user = await requireUser();
    if (!["owner", "admin", "reviewer"].includes(user.role)) {
      return jsonOk({ error: "Sem permissão para decisão manual de DIFAL." }, 403);
    }
    const { id } = await params;
    const body = (await request.json()) as {
      action?: string;
      reason?: string;
      icmsDifalManual?: string;
      fecpManual?: string;
    };
    if (!body.action || !(ACTIONS as readonly string[]).includes(body.action as (typeof ACTIONS)[number])) {
      return jsonOk({ error: "Ação manual inválida." }, 400);
    }
    const decision = await saveManualTaxDecision({
      tenantId: user.tenantId,
      actorUserId: user.id,
      itemId: id,
      action: body.action as (typeof ACTIONS)[number],
      reason: body.reason ?? "",
      icmsDifalManual: body.icmsDifalManual,
      fecpManual: body.fecpManual,
    });
    return jsonOk({ decision }, 201);
  } catch (error) {
    if (error instanceof AnalysisError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    return jsonError(error);
  }
}

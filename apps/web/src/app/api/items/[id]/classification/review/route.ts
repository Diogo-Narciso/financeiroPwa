import { PURPOSES, type Purpose } from "@portal-difal/classifier";
import { AnalysisError, decideClassification } from "@/server/analysis";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const user = await requireUser();
    if (!["owner", "admin", "analyst", "reviewer"].includes(user.role)) {
      return jsonOk({ error: "Sem permissão." }, 403);
    }
    const { id } = await params;
    const body = (await request.json()) as {
      purpose?: string;
      acceptSuggestion?: boolean;
      reason?: string;
    };
    if (!body.purpose || !(PURPOSES as readonly string[]).includes(body.purpose)) {
      return jsonOk({ error: "Finalidade inválida." }, 400);
    }
    const decision = await decideClassification({
      tenantId: user.tenantId,
      actorUserId: user.id,
      itemId: id,
      purpose: body.purpose as Purpose,
      acceptSuggestion: Boolean(body.acceptSuggestion),
      reason: body.reason,
    });
    return jsonOk({ decision }, 201);
  } catch (error) {
    if (error instanceof AnalysisError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    return jsonError(error);
  }
}

import { HomologationError, updatePendency } from "@/server/homologation";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  try {
    const user = await requireUser();
    const body = (await request.json()) as {
      code?: string;
      status?: "open" | "in_progress" | "resolved" | "accepted_risk";
      notes?: string;
    };
    if (!body.code || !body.status) {
      return jsonOk({ error: "code e status são obrigatórios." }, 400);
    }
    const item = await updatePendency({
      code: body.code,
      status: body.status,
      notes: body.notes ?? "",
      actorUserId: user.id,
      tenantId: user.tenantId,
      role: user.role,
    });
    return jsonOk({ ok: true, item });
  } catch (error) {
    if (error instanceof HomologationError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    return jsonError(error);
  }
}

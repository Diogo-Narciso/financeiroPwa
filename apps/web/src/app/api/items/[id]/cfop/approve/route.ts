import { ExportError, approveBookkeepingCfop } from "@/server/export-zip";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";
type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const user = await requireUser();
    if (!["owner", "admin", "reviewer"].includes(user.role)) {
      return jsonOk({ error: "Sem permissão." }, 403);
    }
    const { id } = await params;
    const body = (await request.json()) as { bookkeepingCfop?: string; reason?: string };
    const row = await approveBookkeepingCfop({
      tenantId: user.tenantId,
      actorUserId: user.id,
      itemId: id,
      bookkeepingCfop: body.bookkeepingCfop ?? "",
      reason: body.reason ?? "",
    });
    return jsonOk({ decision: row }, 201);
  } catch (error) {
    if (error instanceof ExportError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    return jsonError(error);
  }
}
